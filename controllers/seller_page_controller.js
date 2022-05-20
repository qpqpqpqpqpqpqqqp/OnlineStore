const Product = require('../models/product')
const path = require("path")

exports.create_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    const name = req.session.username;
    res.render(path.resolve('./public/front/sellerPage/createProd.ejs'), {username: name, err: error});
};

exports.create_post = async (req, res) => {
    const {name, type, price, quantity} = req.body
    const author = req.session.username

    if (!name && !type && !price && !quantity) {
        req.session.error = "Content empty!";
        return res.redirect('/seller/create');
    }

    let product = await Product.findOne({name})
    if (product) {
        req.session.error = "Such product already exists!";
        return res.redirect('/seller/create');
    }

    product = new Product({
        name,
        type,
        price,
        quantity,
        author
    });

    await product.save()
    res.redirect('/seller/profile')
};

exports.read_get = async (req, res) => {
    const author = req.session.username
    const email = req.session.email
    const phone = req.session.phone
    const products = await Product.find({author})
    res.render(path.resolve('./public/front/sellerPage/readProd.ejs'), {prod: products, username: author, email: email, phone: phone});
};

// exports.find_get = async (req, res) => {
//     res.render(path.resolve('./front/adminPage/find.ejs'), {data: null, type: null});
// };
//
// exports.muissa = async (req, res) => {
//     const {email} = req.body
//     const p = path.resolve('./front/adminPage/find.ejs')
//
//     let seller = await Seller.findOne({email})
//     let customer = await Customer.findOne({email})
//     let admin = await Admin.findOne({email})
//
//     if (seller) {
//         res.render(p, {data: seller, type: 'Seller'})
//     } else if (customer) {
//         res.render(p, {data: customer, type: 'Customer'})
//     } else if (admin) {
//         res.render(p, {data: admin, type: 'Admin'})
//     } else {
//         res.render(p, {data: null, type: 'orange'})
//     }
// };

exports.update_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./public/front/sellerPage/updateProd.ejs'), {err: error, oldProd: null, newProd: null});
};

exports.update_patch = async (req, res) => {
    // const {currName, name, type, price, quantity} = req.body
    const {currName, type, price, quantity} = req.body

    const author = req.session.username

    if (!currName && !type && !price && !quantity) {
        req.session.error = "Content empty!";
        return res.redirect('/seller/update');
    }
    // if (!currName && !name && !type && !price && !quantity) {
    //     req.session.error = "Content empty!";
    //     return res.redirect('/seller/update');
    // }

    const own = await Product.findOne({name: currName})
    const name = own.name

    if (!own || own.author !== author) {
        req.session.error = "Such product is not in your list!"
        return res.redirect('/seller/update')
    }

    let product = new Product({
        name: name,
        type,
        price,
        quantity,
        author,
    });
    await Product.findOneAndUpdate({name: currName}, {
        name: name,
        type,
        price,
        quantity,
        author,
    }).then(data => {
        if (!data) {
            req.session.error = "Product to update does not exist!";
            return res.redirect('/seller/update');
        } else {
            res.render(path.resolve('./public/front/sellerPage/updateProd.ejs'), {err: null, oldProd: currName, newProd: product});
        }
    })
};

exports.delete_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;

    const author = req.session.username;
    const products = await Product.find({author})
    res.render(path.resolve('./public/front/sellerPage/deleteProd.ejs'), {prod: products, err: error});
};

exports.delete_post = async (req, res) => {
    const {name} = req.body

    const product = await Product.findOne({name})
    const author = req.session.username;

    if (!product || product.author !== author) {
        req.session.error = "Such product is not in your list!"
        return res.redirect('/seller/delete')
    }

    await Product.deleteOne(product)
    res.redirect('/seller/delete')
};