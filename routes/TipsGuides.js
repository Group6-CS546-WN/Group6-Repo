// Import the express router as shown in the lecture code
import {Router} from 'express';
const router = Router();
import {createTipsGuides, getTipsGuides, removeTipsGuides, updateTipsGuides, getAllTipsGuides} from '../data/TipsGuides.js';
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
      
      const correctFormat = await getAllTipsGuides();
     
     
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
      const { posterUsername, title, text } = req.body;/////////////////////////////////
      const newProducts = await createTipsGuides(posterUsername, title, text);
      return res.json(newProducts);
    } catch (e) {
      return res.status(400).json(e);
    }
  });


//-------------------------------------------------------------------------------------------------- .get


router
  .route('/:TipsGuidesId')
  .get(async (req, res) => {



    try {
      const prod = await getTipsGuides(req.params.TipsGuidesId);
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
      await removeTipsGuides(req.params.TipsGuidesId);
      return res.json({ "_id": req.params.TipsGuidesId, "deleted": true});
    } catch (e) {
      return res.status(400).json(e);
    }

  })

  //-------------------------------------------------------------------------------------------------- .put

  .put(async (req, res) => {
 


    try {
      const productInfo = req.body;
      
      
      const updatedProd = await updateTipsGuides(
        req.params.TipsGuidesId, 
        productInfo.posterUsername,
        productInfo.title, 
        productInfo.text, 
        );

     
      return res.json(updatedProd);
    } catch (e) {
      return res.status(400).json(e);
    }
  });

  

//--------------------------------------------------------------------------------------------------

  export default router;