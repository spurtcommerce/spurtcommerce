
export const customTable = [
  
    {
      displayName: 'CMS.PageGroup.GroupName',
      id: 'groupName',
      type: 'template',
      checked: true,
      customStyle: {
        trow: {
          width:"30%"
          // class: 'text-right'
        },
        tbody: {
          class: 'fw-semibold'
        }
      }
    },
  
    {
      displayName: 'CMS.PageGroup.Status',
      id: 'isActive',
      type: 'template',
      checked: true,
      customStyle:{
        trow:{
          width:"40%",
          class: 'text-center'
        }
      }

    },  
    {
      displayName: 'CMS.Pages.Action',
      id: 'menu',
      type: 'threeDotMenu',
      checked: true,
      customStyle: {
        trow: {
          width:"30%",
          class: 'text-center'
        },
        tbody: {
          class: 'text-center'
        }
      },
      menuData: [
        {
          name: 'Edit', img:'assets/img/edit.svg', displayName: 'marketplace.common.Edit',
        },
        {
          name: 'Delete', img:'assets/img/delete-new.svg', displayName: 'marketplace.common.Delete',
        }
      ]
    }
  ]

  export const filterFields = {
    Search: {
        label: '',
        name: 'search',
        aliasName:'',
        validatiors: [],
        type: 'text',
        placeholder:'marketplace.common.Search',
      },
  }