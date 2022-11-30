"use strict";

const { admin } = require('../utils/initializeAdmin.js')
const { getTokenId } = require('../utils/getTokenId.js')
const { vedhg } = require('../utils/dateRangeHash.js')
const { decode: bufferDecoder } = require('../utils/bufferEncoder')
const isNil = require('lodash/isNil')
const isArray = require('lodash/isArray')
const { v4 } = require('uuid')
const fbadmin = require('firebase-admin');
const { FieldValue } = fbadmin.firestore
const stringify = require('../utils/betterStableStringify')
const { diff } = require("deep-object-diff")
const { isUserAdmin } = require('../utils/roles')

function setIdIfNotSet(obj, isProcedure = false) {
    if (isNil(obj.id)) {
        if(isProcedure){
            let { procedure_code: procedureCode, procedure_start: procedureStart, procedure_end: procedureEnd } = obj
            procedureCode = procedureCode || '000'
            const encoded = vedhg.encodeDates(procedureStart, procedureEnd)
            console.log(encoded)
            obj.id = [procedureCode, encoded].join('.')
        }else{
            obj.id = v4()
        }
    }
    return obj
}

/*
    data structure: {
        procedures: {
            added: [

            ],
            updated: [

            ],
            deleted: [

            ]
        },
        equipments: {
            added: [

            ],
            updated: [

            ],
            deleted: [

            ]
        },
        assets: {
            added: [

            ],
            updated: [

            ],
            deleted: [

            ]
        },
        shoot: {

        }
    }
*/

module.exports = function () {
    const db = admin.firestore();
    const auth = admin.auth()

    return async (req, res) => {
        const tokenId = getTokenId(req)

        let uid;
        if (isNil(tokenId)) {
            //token is nil, exit
            res.send({ status: 401, message: "unauthorized" })
            throw new Error("unauthorized")
        } else {
            try {
                const decodedToken = await auth.verifyIdToken(tokenId)
                uid = decodedToken.uid
            } catch (error) {
                //token is unverifiable, exit
                res.send({ status: 401, message: "unauthorized" })
                throw new Error("unauthorized")
            }
        }

        const data = bufferDecoder(req.body.message.data)
        const { shoot: { id: shootId } } = data
        
        if (isNil(shootId)) {
            throw new Error("Null shoot id")
        }

        const userAdmin = await isUserAdmin(uid, db)
        const userCreatedShoot = await db
            .collection("shoots")
            .doc(data.shoot.id)
            .get()
            .then((snap) => {
                return snap.get('created_by').id === uid
            })

        if (!(userAdmin || userCreatedShoot)) {
            res.send({ status: 402, message: "unauthorized" })
            throw new Error("unauthorized")
        }

        const editShootWithSubcollections = async function (data) {
            const { procedures, equipments, assets, shoot } = data
            if (isNil(shoot)) {
                throw new Error("Null shoot")
            }

            const { status, ...shootData } = shoot

            const createChanges = function (collectionObj) {
                const collectionName = Object.keys(collectionObj)[0]
                const collection = collectionObj[collectionName]
                const { added, updated, deleted } = collection
                const promises = []

                if (!isNil(added)) {
                    const addedPromises = added.map((addObj) => {
                        setIdIfNotSet(addObj, collectionName === 'procedures')
                        const { id, ...addDuplicate } = addObj
                        return db
                            .collection("shoots")
                            .doc(shootId)
                            .collection(collectionName)
                            .doc(id)
                            .set({
                                ...addDuplicate
                            }).then(() => {
                                return db
                                    .collection("shoots")
                                    .doc(shootId)
                                    .collection(collectionName)
                                    .doc(id)
                                    .collection("changes")
                                    .doc("0")
                                    .set({
                                        updated_date: new Date(),
                                        diff: stringify(diff({}, addDuplicate))
                                    })
                            })
                    })
                    promises.push(...addedPromises)
                }

                if (!isNil(updated)) {
                    const updatePromises = updated.reduce((acc, updObj) => {
                        const { id, ...updDuplicate } = updObj

                        const changesPromise = db
                            .collection("shoots")
                            .doc(shootId)
                            .collection(collectionName)
                            .doc(id)
                            .collection("changes")
                            .get()
                            .then((snap) => {
                                const len = snap.docs.length
                                const oldData = JSON.parse(snap.docs.find(v => v.id == (len - 1).toString()).data().diff)
                                const lenStr = len.toString()
                                return db
                                    .collection("shoots")
                                    .doc(shootId)
                                    .collection(collectionName)
                                    .doc(id)
                                    .collection("changes")
                                    .doc(lenStr)
                                    .set({
                                        updated_date: new Date(),
                                        diff: stringify(diff(oldData, updDuplicate))
                                    })
                            })

                        const mainPromise = db
                            .collection("shoots")
                            .doc(shootId)
                            .collection(collectionName)
                            .doc(id)
                            .set({
                                ...updDuplicate
                            }, { merge: true })

                        acc.push(changesPromise, mainPromise)
                        return acc
                    }, [])
                    promises.push(...updatePromises)
                }

                if (!isNil(deleted)) {
                    const delPromises = deleted.map((delId) => {
                        return db
                            .collection("shoots")
                            .doc(shootId)
                            .collection(collectionName)
                            .doc(delId)
                            .collection("changes")
                            .get()
                            .then((snap) => {
                                const batch = db.batch();
                                snap.docs.forEach((doc) => {
                                    batch.delete(doc.ref);
                                });
                                return batch.commit();
                            }).then(() => {
                                return db
                                    .collection("shoots")
                                    .doc(shootId)
                                    .collection(collectionName)
                                    .doc(delId)
                                    .delete()
                            })
                    })
                    promises.push(...delPromises)
                }

                return promises
            }

            const oldData = await db.collection("shoots").doc(shootId).get().then((snap) => {
                return snap.data()
            })

            await db.collection("shoots").doc(shootId).set({
                ...shootData
            }, { merge: true })

            const newData = await db.collection("shoots").doc(shootId).get().then((snap) => {
                return snap.data()
            })

            const diffObj = diff(oldData, newData)
            if (Object.keys(diffObj).length > 0) {
                const count = (await db.collection("shoots").doc(shootId).collection("changes").count().get()).data().count
                await db
                    .collection("shoots")
                    .doc(shootId)
                    .collection("changes")
                    .doc(count.toString())
                    .set({
                        updated_date: new Date(),
                        diff: stringify(diffObj)
                    })
            }

            const promises = []

            if (!isNil(procedures)) {
                promises.push(...createChanges({ procedures }))
            }

            if (!isNil(equipments)) {
                promises.push(...createChanges({ equipments }))
            }

            if (!isNil(assets)) {
                promises.push(...createChanges({ assets }))
            }

            if (!isNil(status)) {
                const statusObj = isArray(status) ? status : [status]
                await db.collection("shoots").doc(shootId).set({
                    current_statuses: statusObj,
                    status_history: FieldValue.arrayUnion(...statusObj.map((statusStr) => {
                        return {
                            note: "",
                            status: statusStr,
                            date: new Date(),
                            processed_by: db.collection("users").doc(uid)
                        }
                    }))
                }, { merge: true })
            }

            return promises
        }

        await editShootWithSubcollections(data)
        res.send({ status: 200, message: "we good" })
    }
}