import {TimelineRow} from 'animation-timeline-js'

export const rows = [
    {
        selected: false,
        draggable: false,

        keyframes: [
            {
                val: 40,
                shape: "rhomb"
            },
            {
                shape: "rhomb",
                val: 3000,
                selected: false
            }
        ]
    },
    {
        selected: false,
        hidden: false,
        keyframes: [
            {
                cursor: "default",
                val: 2000,
            },
            {
                val: 2500
            },
            {
                val: 2600
            }
        ],
    },
    {
        hidden: false,
        keyframes: [
            {
                val: 1000
            },
            {
                val: 1500
            },
            {
                val: 2000
            }
        ]
    },
    {
        title: 'Groups (Limited)',
        keyframes: [
            {
                val: 40,
                max: 850,
                group: 'a'
            },
            {
                val: 800,
                max: 900,
                group: 'a'
            },
            {
                min: 1000,
                max: 3400,
                val: 1900,
                group: 'b'
            },
            {
                val: 3000,
                max: 3500,
                group: 'b'
            },
            {
                min: 3500,
                val: 4000,
                group: 'c'
            }
        ]
    },
    {
        keyframes: [
            {
                val: 100
            },
            {
                val: 3410
            },
            {
                val: 2000
            }
        ]
    },
    {
        title: 'Style Customized',
        groupHeight: 20,
        keyframesStyle: {
            shape: "rect",
            width: 5,
            height: 20,
        },
        keyframes: [
            {
                val: 90
            },
            {
                val: 3000
            }
        ]
    }, {}, {
        title: 'Max Value',
        max: 4000,
        keyframes: [
            {
                width: 4,
                height: 20,
                group: 'block',
                shape: "rect",
                fillColor: 'Red',
                strokeColor: 'Black',
                val: 4000,
                selectable: false,
                draggable: false
            },
            {
                val: 1500
            },
            {
                val: 2500
            },
        ]
    }, {}, {}, {}, {}, {}, {}, {}
] as TimelineRow[];
