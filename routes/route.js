const express = require('express'); //Import Router() in correct format
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');

router.use(authMiddleware);

const {
    sellerRegister,
    sellerLogIn
} = require('../controllers/sellerController.js'); //Replace orderController with sellerController

const {
    productCreate,
    getProducts,
    getProductDetail,
    searchProduct,//Import searchProduct from productController.js
    searchProductbyCategory,
    searchProductbySubCategory,//Import searchProductBySubCategory from productController.js
    getSellerProducts,
    updateProduct,
    deleteProduct,
    deleteProducts,
    deleteProductReview,
    deleteAllProductReviews,
    addReview,
    getInterestedCustomers,
    getAddedToCartProducts,
} = require('../controllers/productController.js');

const {
    customerRegister,
    customerLogIn,
    getCartDetail,
    cartUpdate
} = require('../controllers/customerController.js');

const {
    newOrder,
    getOrderedProductsBySeller,
    getOrderedProductsByCustomer //import getOrderedProductsByCustomer from customerController
} = require('../controllers/orderController.js');



router.post('/SellerRegister', sellerRegister);
router.post('/SellerLogin', sellerLogIn);


router.post('/ProductCreate', productCreate);
router.get('/getSellerProducts/:id', getSellerProducts);
router.get('/getProducts', getProducts);
router.get('/getProductDetail/:id', getProductDetail);
router.get('/getInterestedCustomers/:id', getInterestedCustomers);
router.get('/getAddedToCartProducts/:id', getAddedToCartProducts);

router.put('/ProductUpdate/:id', updateProduct);
router.put('/addReview/:id', addReview);

router.get('/searchProduct/:key', searchProduct);//Call the correct function needed for the search
router.get('/searchProductbyCategory/:key', searchProductbyCategory);
router.get('/searchProductbySubCategory/:key', searchProductbySubCategory);//Call the correct function needed for the search

router.delete('/DeleteProduct/:id', deleteProduct);
router.delete('/DeleteProducts/:id', deleteProducts);
router.delete ('/deleteProductReview/:id', deleteProductReview);
router.put ('/deleteAllProductReviews/:id', deleteAllProductReviews);


router.post('/CustomerRegister', customerRegister);
router.post('/CustomerLogin', customerLogIn);
router.get('/getCartDetail/:id', getCartDetail);
router.put('/cartUpdate/:id', cartUpdate); //Use proper naming to clear confusion rplacing customer with cart


router.post('/newOrder', newOrder);
router.get('/getOrderedProductsByCustomer/:id', getOrderedProductsByCustomer);//Replace getOrderedProductsBySeller function with getOrderedProductsByCustomer 
router.get('/getOrderedProductsBySeller/:id', getOrderedProductsBySeller);

module.exports = router; // export router instance