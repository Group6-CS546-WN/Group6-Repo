import {dbConnection, closeConnection} from '../config/mongoConnection.js';
// import * as users from '../data/users.js';
// import * as businesses from '../data/businesses.js';

import {create} from '../data/businesses.js';
import {createUsers} from '../data/users.js';
import {createProjects} from '../data/projects.js';
import {createReview} from '../data/reviews.js';
import {createTipsGuides} from '../data/TipsGuides.js';
import {createForum} from '../data/forum.js';
import {createProducts} from '../data/products.js';
import {createProductReview} from '../data/productReviews.js';

//export const seedDatabase = async () => {
const db = await dbConnection();
await db.dropDatabase();

// const patrick = await users.addUser('Patrick', 'Hill');
// const pid = patrick._id.toString();
// const aiden = await users.addUser('Aiden', 'Hill');
// const aid = aiden._id.toString();
// await posts.addPost('Hello, class!', 'Today we are creating a blog!', pid);
// await posts.addPost(
//   'Using the seed',
//   'We use the seed to have some initial data so we can just focus on servers this week',
//   pid
// );

// await posts.addPost(
//   'Using routes',
//   'The purpose of today is to simply look at some GET routes',
//   pid
// );

// await posts.addPost("Aiden's first post", "This is aiden's first post", aid, [
//   'toys'
// ]);
// await posts.addPost("Aiden's second post", "This is aiden's second post", aid, [
//   'aiden'
// ]);
// await posts.addPost("Aiden's third post", "This is aiden's thrid post", aid, [
//   'aiden',
//   'kid'
// ]);

const business1 = await create(
    "Earth & Me", 
    "Wellness Shop",
    "30-38 Steinway St, Queens, NY 11103",
    "A zero-waste store in New York City offering...",
    "https://www.earthandme.co/",
    "(347) 730-6156"
    );
 const bus1 = business1._id.toString();

//-------- business2
 const business2 = await create(
    "LES Ecology Center", 
    "Recycling and Compost Facility",
    "Seward Park Essex and Canal Street, New York, NY 10002",
    "The LES Ecology Center has pioneered community-based models in urban sustainability since 1987. We provide unique composting  and e-waste  services, environmental stewardship  opportunities, and educational programming  to all New Yorkers to create an equitable, resilient, and sustainable city....",
    "https://www.lesecologycenter.org/",
    "(212) 477-4022"
    );
 const bus2 = business2._id.toString();

//-------- business3
 const business3 = await create(
    "Le Botaniste", 
    "Vegan Restaurant",
    "127 Grand St, New York, NY 10013",
    "Plant-based eats served in a casual space featuring dark wood interiors and a checkered floor....",
    "https://lebotaniste.us/",
    "(646) 870-7770"
    );
 const bus3 = business3._id.toString();

//------------------------------------------------------------------------------------------------------------------users

//users collection ***********************************************

//user1
const user1 = await createUsers(
"John",
"Doe",
"johnDoe@gmail.com",
"johnDoeABC",
30,
//"03/05/2024",
200
);
const u1 = user1._id.toString();

//user2
const user2 = await createUsers(
    "Eli",
    "Grant",
    "eliGrant@gmail.com",
    "eliGrantABC",
    28,
    //"04/06/2024",
    150
    );
    const u2 = user2._id.toString();

//user3
    const user3 = await createUsers(
        "Alora",
        "Fraizer",
        "aloraFraizer@gmail.com",
        "aloraFraizerABC",
        22,
        //"04/06/2024",
        100
        );
        const u3 = user3._id.toString();


console.log('Done seeding database');

await closeConnection();
//    }