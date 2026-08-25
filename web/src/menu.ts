export type MenuAction = {
  option: string
  label: string
  path: string
  description: string
}

export const menuActions: MenuAction[] = [
  {
    option: '1',
    label: 'Init Database',
    path: '/init',
    description: 'Load the seed accounts into local state.',
  },
  {
    option: '2',
    label: 'Transaction',
    path: '/transaction',
    description: 'Record a deposit or a withdrawal.',
  },
  {
    option: '3',
    label: 'Report',
    path: '/report',
    description: 'View the account balance summary.',
  },
  {
    option: '4',
    label: 'Exit',
    path: '/exit',
    description: 'Leave the application.',
  },
]
