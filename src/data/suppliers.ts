export interface ISupplier {
  id: string,
  name: string,
  createdAt: Date,
  phoneNumber: string,
  status: 'Deactivated' | 'Active',
  totalDrugs: number
}


const suppliers: ISupplier[] = [
  { id: '1', name: 'Earnest Chemist LTD', createdAt: new Date(), phoneNumber: '0244356722', status: 'Deactivated', totalDrugs: 40 },
  { id: '2', name: 'Earnest Chemist LTD', createdAt: new Date(), phoneNumber: '0244356722', status: 'Active', totalDrugs: 70 },
  { id: '3', name: 'Earnest Chemist LTD', createdAt: new Date(), phoneNumber: '0244356722', status: 'Active', totalDrugs: 2 },
  { id: '4', name: 'Earnest Chemist LTD', createdAt: new Date(), phoneNumber: '0244356722', status: 'Active', totalDrugs: 45 },
  { id: '5', name: 'Earnest Chemist LTD', createdAt: new Date(), phoneNumber: '0244356722', status: 'Active', totalDrugs: 0 },
  { id: '6', name: 'Earnest Chemist LTD', createdAt: new Date(), phoneNumber: '0244356722', status: 'Active', totalDrugs: 100 },
  { id: '7', name: 'Earnest Chemist LTD', createdAt: new Date(), phoneNumber: '0244356722', status: 'Active', totalDrugs: 40 },
  { id: '8', name: 'Earnest Chemist LTD', createdAt: new Date(), phoneNumber: '0244356722', status: 'Active', totalDrugs: 70 },
]


export default suppliers