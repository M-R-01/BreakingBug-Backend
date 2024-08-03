const Order = require('../models/orderSchema.js');

const newOrder = async (req, res) => {
    try {

        const {
            buyer,
            shippingData,
            orderedProducts,
            paymentInfo,
            productsQuantity,
            totalPrice,
        } = req.body;

        const order = await Order.create({
            buyer,
            shippingData,
            orderedProducts,
            paymentInfo,
            paidAt: Date.now(),
            productsQuantity,
            totalPrice,
        });

        return res.send(order);

    } catch (err) {
        res.status(500).json(err);
    }
}

//No use of this secretDebugValue so removed

const getOrderedProductsByCustomer = async (req, res) => {
    try {
        let orders = await Order.find({ buyer: req.params.id });

        
        const orderedProducts = orders.reduce((accumulator, order) => {
            order.orderedProducts.forEach(product => {
                if (product.buyer.toString() === req.params.id) { //Check if customerID is correct
                    accumulator.push(product);
                }
            });
            return accumulator; //Filter the products correctly 
        }, []);
        
        if (orderedProducts.length > 0) {
            res.send(orderedProducts);
        } else {
           
            res.send({ message: "No products found. Check the filtering logic." });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getOrderedProductsBySeller = async (req, res) => {
    try {
        const sellerId = req.params.id;

        const ordersWithSellerId = await Order.find({
            'orderedProducts.seller': sellerId //Replace orderedProducts.sellerId with orderedProducts.seller
        });

        if (ordersWithSellerId.length > 0) {
            const orderedProducts = ordersWithSellerId.reduce((accumulator, order) => {
                order.orderedProducts.forEach(product => {
                    const existingProductIndex = accumulator.findIndex(p => p._id.toString() === product._id.toString());
                    if (existingProductIndex !== -1) {
                        accumulator[existingProductIndex].quantity += product.quantity;
                    } else {
                        accumulator.push(product);
                    }
                });
                return accumulator;
            }, []);
            res.send(orderedProducts);
        } else {
            res.send({ message: "No products found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    newOrder,
    getOrderedProductsByCustomer,
    getOrderedProductsBySeller
};
