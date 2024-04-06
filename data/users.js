// This data file should export all functions using the ES6 standard as shown in the lecture code
// import {products} from './mongoCollections.js';
import {users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
//create, read (getAll, get), update, delete (remove)

//---------------------------------------------------- get

export const getUsers = async (userId) => {

  let x = new ObjectId();

    //Error checks ooooooooooooooooooooooo

    if (!userId) throw 'Error: You must provide an id to search for';
    if (typeof userId !== 'string') throw 'Error: Id must be a string';
    if (userId.trim().length === 0) throw 'Error: Id cannot be an empty string or just spaces';
    userId = userId.trim();
    if (!ObjectId.isValid(userId)) throw 'Error: Invalid object ID';

    //end error checks ooooooooooooooooooooooo

  
    const usersCollection = await users();
    const p = await usersCollection.findOne({_id: new ObjectId(userId)});
    if (p === null || !p) throw 'Error: No user with that id';
    p._id = p._id.toString();
    return p;


};

//---------------------------------------------------- getAll


export const getAllUsers = async () => {


  const usersCollection = await users();
 const usersList =  await usersCollection.find({}, { projection: { _id: 1, username: 1 } }).toArray();
 
 //Error checks ooooooooooooooooooooooo

 if (!usersList) throw 'Error: Could not get all users';
 if (usersList === undefined || usersList === null) {
  return [];
}

//end error checks ooooooooooooooooooooooo
 
return usersList;

};

//---------------------------------------------------------- create

export const createUsers = async (
  firstName,
  lastName,
  email,
  username,
  age,
  //dateJoined,
  carbonFootprint
) => {


  //Error checks ooooooooooooooooooooooo

  if (!firstName) throw 'Error: Input missing firstName!';
  if (!lastName) throw 'Error: Input missing lastName!';
  if (!email) throw 'Error: Input missing email!';
  if (!username) throw 'Error: Input missing username!';
  if (!age) throw 'Error: Input missing age!';
  //if (!dateJoined) throw 'Error: Input missing dateJoined!';
  if (!carbonFootprint) throw 'Error: Input missing carbonFootprint!';

 if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof username !== 'string' /*|| typeof dateJoined !== 'string'*/) throw 'Error: Given input incorrect type!';
 if (firstName.trim().length === 0 || lastName.trim().length === 0 || email.trim().length === 0 || username.trim().length === 0 /*|| dateJoined.trim().length === 0*/) throw 'Error: Cannot be empty string!';

 if (typeof age !== 'number') throw 'Error: age must be a number';
 if (typeof carbonFootprint !== 'number') throw 'Error: carbon footprint must be a number';

 //we must make the date in mm/dd/yyyy format (2 for month, 2 for day, 4 for year) using padding
 const nowDate = new Date();
 const m = (nowDate.getMonth() + 1).toString().padStart(2, '0');
 const d = nowDate.getDate().toString().padStart(2, '0');
 const y = nowDate.getFullYear();
 const dateJoined = `${m}/${d}/${y}`;

//end error checks ooooooooooooooooooooooo


//trim the strings
firstName = firstName.trim();
lastName = lastName.trim();
email = email.trim();
username = username.trim();
//dateJoined = dateJoined.trim();

let newUsers = {
  firstName: firstName,
  lastName: lastName,
  email: email,
  username: username,
  age: age,
  dateJoined: dateJoined,
  carbonFootprint: carbonFootprint,
//For create: When a product is created, in your DB function, you will initialize the reviews array to be an empty array. You will also initialize averageRating to be 0 when a product is created.
reviews: [],
favoriteBusinesses: []
};

const usersCollection = await users();
const insertInfo = await usersCollection.insertOne(newUsers);
if (!insertInfo.acknowledged || !insertInfo.insertedId)
  throw 'Error: Could not add user';

const newId = insertInfo.insertedId.toString();

const prod = await getUsers(newId);
return prod;

};

//---------------------------------------------------- remove

export const removeUsers = async (userId) => {

//Error checks ooooooooooooooooooooooo

  if (!userId) throw 'Error: You must provide an ID to search for';
    if (typeof userId !== 'string') throw 'Error: ID must be a string';
    if (userId.trim().length === 0) throw 'Error: ID cannot be an empty string or just spaces';
    userId = userId.trim();
    if (!ObjectId.isValid(userId)) throw 'Error: Invalid object ID';

//end error checks ooooooooooooooooooooooo


    const usersCollection = await users();
    const deletionInfo = await usersCollection.findOneAndDelete({
      _id: new ObjectId(userId)
    });


    if (!deletionInfo) {
      throw `Error: Could not delete user with id of ${userId}`;
    }
    return `${deletionInfo.username} has been successfully deleted!`;


};


//---------------------------------------------------- update


export const updateUsers = async (
  userId,
  firstName,
  lastName,
  email,
  username,
  age,
  //dateJoined,
  carbonFootprint,
) => {


  //Error checks ooooooooooooooooooooooo

  if (!firstName) throw 'Error: Input missing firstName!';
  if (!lastName) throw 'Error: Input missing lastName!';
  if (!email) throw 'Error: Input missing email!';
  if (!username) throw 'Error: Input missing username!';
  if (!age) throw 'Error: Input missing age!';
  //if (!dateJoined) throw 'Error: Input missing dateJoined!';
  if (!carbonFootprint) throw 'Error: Input missing carbonFootprint!';

 if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof username !== 'string' /*|| typeof dateJoined !== 'string'*/) throw 'Error: Given input must be a string!';
 if (firstName.trim().length === 0 || lastName.trim().length === 0 || email.trim().length === 0 || username.trim().length === 0 /*|| dateJoined.trim().length === 0*/) throw 'Error: Cannot be empty string!';

 if (typeof age !== 'number') throw 'Error: age must be a number';
 if (typeof carbonFootprint !== 'number') throw 'Error: carbon footprint must be a number';

 //we must make the date in mm/dd/yyyy format (2 for month, 2 for day, 4 for year) using padding
 const nowDate = new Date();
 const m = (nowDate.getMonth() + 1).toString().padStart(2, '0');
 const d = nowDate.getDate().toString().padStart(2, '0');
 const y = nowDate.getFullYear();
 const dateJoined = `${m}/${d}/${y}`;

//end error checks ooooooooooooooooooooooo


//trim the strings
userId = userId.trim();
firstName = firstName.trim();
lastName = lastName.trim();
email = email.trim();
username = username.trim();
//dateJoined = dateJoined.trim();



const updatedUsers = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    age: age,
    dateJoined: dateJoined,
    carbonFootprint: carbonFootprint
};

const usersCollection = await users();


    const updatedInfo = await usersCollection.findOneAndUpdate(
      {_id: new ObjectId(userId)},
      {$set: updatedUsers },
      {returnDocument: 'after'}
    );


    if (!updatedInfo) {
      throw 'Error: Could not update users successfully';
    }
    //updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;


};


 //function for updating average rating
 export const updateAvg = async (userId, newAvg) => {
  const usersCollection = await users();
  await usersCollection.updateOne(
    { _id: new ObjectId(userId)},
    { $set: {averageRating: newAvg}}
  );
};