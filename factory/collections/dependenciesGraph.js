const AssetContractFactory = require("./asset-contracts/assetContracts")
const AssetFactory = require("./assets/assets")
const ContractTemplateFactory = require("./contract-templates/contractTemplates")
const ContractFactory = require("./contracts/contracts")
const ContractVersionFactory = require("./contracts/contract-versions/contractVersions")
const OrderFactory = require("./orders/orders")
const OrderVersionFactory = require("./orders/order-versions/orderVersions")
const PaymentFactory = require("./payments/payments")
const ProcedureTypeFactory = require("./procedure-types/procedureTypes")
const ShootFactory = require("./shoots/shoots")
const SubmissionFormFactory = require("./submission-forms/submissionForms")
const UserFactory = require("./users/users")

const dep = new Map()
dep.set(UserFactory, [])
dep.set(ContractTemplateFactory, [])
dep.set(ProcedureTypeFactory, [])
dep.set(AssetFactory, [UserFactory])
dep.set(ContractFactory, [UserFactory])
dep.set(OrderFactory, [UserFactory])
dep.set(AssetContractFactory, [AssetFactory])
dep.set(ContractVersionFactory, [UserFactory, ContractFactory])
dep.set(OrderVersionFactory, [UserFactory, OrderFactory])
dep.set(SubmissionFormFactory, [UserFactory, AssetFactory])
dep.set(PaymentFactory, [UserFactory, OrderFactory, ShootFactory, ContractFactory])

const docCreatorFunction = new Map()
docCreatorFunction.set()

const users = UserFactory.createDocs(10)
const contract_templates = ContractTemplateFactory.createDocs(10)
const procedure_types = ProcedureTypeFactory.createDocs(10)
const assets = AssetFactory.createDocs(10)