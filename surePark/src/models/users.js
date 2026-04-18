const users=[
    {
        Id:1,
        name: "user1",
        email:"user1@example.com",
        password: "Test@123",
        isLoggedIn: false,
        role:"user",
        vehicles:[
            {
                id:1,
                no:"TN/07/AB/1234"
            },
            {
                id:1,
                no:"TN/07/AB/1236"
            }
        ],
        favoriteSlot:[
            {
                locationId: 1,
                floorId: 1,
                slotId: 1               

            },
            {
                locationId: 1,
                floorId: 2,
                slotId: 10               

            },
            {
                locationId: 2,
                floorId: 2,
                slotId: 1               

            }


        ]        
    },
    {
        Id:2,
        name: "user2",
        email:"user2@example.com",
        password: "Test@123",
        isLoggedIn: false,
        role:"user",
         vehicles:[
            {
                no:"TN/07/AB/1234"
            }
        ],
        favoriteSlot:[]
    },
    {
        Id:3,
        name: "user3",
        email:"user3@example.com",
        password: "Test@123",
        isLoggedIn: false,
        role:"user",
         vehicles:[
            {
                no:"TN/07/AB/1234"
            }
        ],
          favoriteSlot:[]
    },
     {
        Id:4,
        name: "admin",
        email:"admin@example.com",
        password: "admin123",
        isLoggedIn: false,
        role:"admin",
        vehicles:null,
          favoriteSlot:[]
    }
];

export default users;
