function makeItemsArray() {
    return [
        [
            {
                id: 1,
                users_id: "1",
                name: "Celery",
                description: "Vegetable",
                itemcount: "70",
                itemprice: "90",
                img: "img3.jpg",
                date_created: "2020-03-01T00:00:00.000Z"
            },
            {
                "id": 3,
                users_id: 1,
                name: "Strawberry",
                description: "Berries",
                itemcount: "10",
                itemprice: "5",
                img: "img2.jpg",
                date_created: "2020-03-01T00:00:00.000Z"
            },
            {
                "id": 4,
                users_id: 16,
                name: "test name",
                description: "test description",
                itemcount: "1",
                itemprice: "12",
                img: "test image",
                date_created: "2020-11-22T23:19:55.900Z"
            },
            
    ]
}

function makeMaliciousItems() {
    const maliciousUser = {
        id: 1,
        username: 'Naughty naughty very naughty <script>alert("xss");</script>',
        password: 'Naughty naughty very naughty <script>alert("xss");</script>',

    }
    const expectedUser = {
        ...maliciousUser,
        username: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;', // converts script to render it inert
        password: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;', // converts script to render it inert
        
    }
    return {
        maliciousUser,
        expectedUser,
    }
}

module.exports = {
    makeItemsArray,
    makeMaliciousItems,
}