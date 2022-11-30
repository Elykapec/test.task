export interface TreeNode {
  id: number,
  label: string,
  children?: TreeNode[]
}

export const availableDocsTreeClasses: TreeNode[] = [
  {
    id: 1,
    label: 'Class 1',
    children: [
      {
        id: 4,
        label: 'Class 11',
        children: [
          {
            id: 9,
            label: 'Class 111',
          },
          {
            id: 10,
            label: 'Class 112',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Class 2',
    children:
      [
        {
          id: 5,
          label: 'Class 21',
        },
        {
          id: 6,
          label: 'Class 22',
        },
      ],
  },
  {
    id: 3,
    label: 'Class 3',
  },
  {
    id: 8,
    label: 'Class 4',
  },
];

export const availableDocsTreeDepartments: TreeNode[] = [
  {
    id: 1,
    label: 'Developers',
    children: [
      {
        id: 4,
        label: '2nd Sub-Developers',
        children: [
          {
            id: 9,
            label: '3d Sub-Developers',
            children: [
              {
                id: 10,
                label: 'iOS & Android Devs',
              },
              {
                id: 10,
                label: '4th Sub-Developers',
              },
            ],
          },

        ],
      },
    ],
  },
  {
    id: 3,
    label: 'Class 3',
  },
  {
    id: 8,
    label: 'Class 4',
  },
];


export const availableDocsTreeDFC3: TreeNode[] = [
  {
    id: 1,
    label: 'Class 1',
    children: [
      {
        id: 4,
        label: 'Class 11',
        children: [
          {
            id: 9,
            label: 'Class 111',
          },
          {
            id: 10,
            label: 'Class 112',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Class 2',
    children:
      [
        {
          id: 5,
          label: 'Class 21',
        },
        {
          id: 6,
          label: 'Class 22',
        },
      ],
  },
  {
    id: 3,
    label: 'Class 3',
  },
  {
    id: 8,
    label: 'Class 4',
  },
];
