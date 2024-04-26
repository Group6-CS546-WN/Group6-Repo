// Import the express router as shown in the lecture code
import {Router} from 'express';
const router = Router();
import {createProjects, getProjects, removeProjects, updateProjects, getAllProjects} from '../data/projects.js';
// Note: please do not forget to export the router!

//our function options from data/products are.. create, getAll, get, update, and remove

//router.route('/').get(async (req, res) => {...                  corresponds to the **getALL** function from data/products.js
//.post(async (req, res) => {...                                  corresponds to the **create** function from in data/products.js
//router.route('/:productId').get(async (req, res) => {...        corresponds to the **get** function from data/products.js
//.delete(async (req, res) => {...                                corresponds to the **remove** function from data/products.js
//.put(async (req, res) => {...                                   corresponds to the **update** function from data/products.js

//-------------------------------------------------------------------------------------------------- .get

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
   

    try {
      
      const correctFormat = await getAllProjects();
     
     
      return res.json(correctFormat);
    } catch (e) {
      return res.status(400).json(e);
    }
  })

  //-------------------------------------------------------------------------------------------------- .post

  .post(async (req, res) => {
    //code here for POST


    //insert the post
    try {
      const { projectName, eventLocation, eventDate, description, link } = req.body;/////////////////////////////////
      const newProducts = await createProjects(projectName, eventLocation, eventDate, description, link);
      return res.json(newProducts);
    } catch (e) {
      return res.status(400).json(e);
    }
  });


//-------------------------------------------------------------------------------------------------- .get


router
  .route('/:projectId')
  .get(async (req, res) => {



    try {
      const prod = await getProjects(req.params.projectId);
      return res.json(prod);
    } catch (e) {
        //lecture code and live session says to use .json below, not .send 
      return res.status(400).json(e);
    }
  })


//-------------------------------------------------------------------------------------------------- .delete


  .delete(async (req, res) => {
    //code here for DELETE



    //try to delete product
    try {
      await removeProjects(req.params.projectId);
      return res.json({ "_id": req.params.projectId, "deleted": true});
    } catch (e) {
      return res.status(400).json(e);
    }

  })

  //-------------------------------------------------------------------------------------------------- .put

  .put(async (req, res) => {
 


    try {
      const productInfo = req.body;
      
      
      const updatedProd = await updateProjects(
        req.params.projectId, 
        productInfo.projectName,
        productInfo.eventLocation, 
        productInfo.eventDate, 
        productInfo.description, 
        productInfo.link, 
        );

     
      return res.json(updatedProd);
    } catch (e) {
      return res.status(400).json(e);
    }
  });

  

//--------------------------------------------------------------------------------------------------

  export default router;