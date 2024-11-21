export const registerFormControls = [{
    name: 'username',
    label: 'User Name',
    placeholder: 'Enter your username',
    componentType: 'input',
    type: 'text'
},
{
    name: 'email',
    label: 'Email',
    placeholder: 'abc@gmail.com',
    componentType: 'input',
    type: 'email'
},
{
    name: 'password',
    label: 'Password',
    placeholder: '******',
    componentType: 'input',
    type: 'password'
},
]

export const loginFormControls = [{
    name: 'email',
    label: 'Email',
    placeholder: 'abc@gmail.com',
    componentType: 'input',
    type: 'email'
}, {
    name: 'password',
    label: 'Password',
    placeholder: '******',
    componentType: 'input',
    type: 'password'
}]

export const addProductFormControls = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter product title",
    },
    {
        label: "Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter product description",
    },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids" },
            { id: "accessories", label: "Accessories" },
            { id: "footwear", label: "Footwear" },
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            { id: "nike", label: "Nike" },
            { id: "adidas", label: "Adidas" },
            { id: "puma", label: "Puma" },
            { id: "levi", label: "Levi's" },
            { id: "zara", label: "Zara" },
            { id: "h&m", label: "H&M" },
        ],
    },
    {
        label: "Price",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Enter product price",
    },
    {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Enter sale price (optional)",
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter total stock",
    },
];

export const shoppingViewMenuHeaderItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/shop/home'
    },
    {
        id: 'men',
        label: 'Men',
        path: '/shop/listing'
    },
    {
        id: 'women',
        label: 'Women',
        path: '/shop/listing'
    },
    {
        id: 'kids',
        label: 'Kids',
        path: '/shop/listing'
    },
    {
        id: 'footwear',
        label: 'Footwear',
        path: '/shop/listing'
    },
    {
        id: 'accessoried',
        label: 'Accessories',
        path: '/shop/listing'
    },
]

export const filterOptions = {
    Category: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
    ],
    Brand: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
    ],
};

export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];