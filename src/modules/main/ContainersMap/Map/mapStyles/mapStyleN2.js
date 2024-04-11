const style = [
  {
    tags: {
      all: ['water'],
    },
    elements: 'geometry',
    stylers: [
      {
        opacity: 0,
      },
    ],
  },

  {
    tags: {
      any: ['poi', 'transit_location'],
    },
    elements: 'label.text.fill',
    stylers: [
      {
        color: '#0000DD',
      },
    ],
  },
]
export default style
