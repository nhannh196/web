import {format} from 'date-fns';
import { ColumnFilter } from './ColumnFilter';
export const COLUMNS = [
	{
		Filter: ColumnFilter,
		Header : 'User ID',
		Footer : 'User ID',
		accessor: 'userId',
		
		disableFilters: true,
	},
	{
		Filter: ColumnFilter,
		Header : 'Username',
		Footer : 'Username',
		accessor: 'username',
		
	},
	{
		Header : 'Full Name',
		Footer : 'Full Name',
		accessor: 'fullName',
		Filter: ColumnFilter,
	},
	{
		Header : 'Email',
		Footer : 'Email',
		accessor: 'email',
		Filter: ColumnFilter,
	},
	// {
	// 	Header : 'Date of  Birth',
	// 	Footer : 'Date of  Birth',
	// 	accessor: 'dateOfBirth',
	// 	Cell: ({ value }) => {return format(new Date(value), 'dd/mm/yyyy')},
	// 	Filter: ColumnFilter,
	// },
	{
		Header : 'Status',
		Footer : 'Status',
		accessor: 'baned',
		Filter: ColumnFilter,
		disableFilters: true,
	},
	// {
	// 	Header : 'Action',
	// 	Footer : 'Action',
	// 	accessor: '',
	// 	Filter: ColumnFilter,
	// 	disableFilters: true,
	// },
]

// export const GROUPED_COLUMNS = [
// 	{
// 		Header : 'Id',
// 		Footer : 'Id',
// 		accessor: 'id'
// 	},
// 	{
// 		Header : 'Name',
// 		Footer : 'Name',
// 		columns: [
// 			{
// 				Header : 'First Name',
// 				Footer : 'First Name',
// 				accessor: 'first_name'
// 			},
// 			{
// 				Header : 'Last Name',
// 				Footer : 'Last Name',
// 				accessor: 'last_name'
// 			},
// 		]
// 	},
// 	{
// 		Header: 'Info',
// 		Footer: 'Info',
// 		columns: [
// 			{
// 				Header : 'Date of  Birth',
// 				Footer : 'Date of  Birth',
// 				accessor: 'date_of_birth'
// 			},
// 			{
// 				Header : 'Country',
// 				Footer : 'Country',
// 				accessor: 'country',
// 			},
// 			{
// 				Header : 'Phone',
// 				Footer : 'Phone',
// 				accessor: 'phone'
// 			},
// 		]
// 	},
// ]