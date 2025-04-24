import  { Fragment, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import CommonForm from '@/components/common/form'
import { addProductFormControls } from '@/config'
import ProductImageUpload from '@/components/admin-view/image-upload'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, deleteProduct, fetchAllProducts, updateProduct } from '@/store/admin-slice/product'
import { useToast } from '@/hooks/use-toast'
import { AdminProductTile } from '@/components/admin-view/product-tile'

const initialState = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''
}

function AdminProducts() {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts)
  const dispatch = useDispatch()
  const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault();
    currentEditedId !== null ?
      dispatch(updateProduct({
        id: currentEditedId, formData
      })).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: 'Product info updated.'
          })
          dispatch(fetchAllProducts());
          setFormData(initialState)
          setOpenCreateProductsDialog(false)
          setCurrentEditedId(null)
        }
      }) :
      dispatch(addNewProduct({
        ...formData,
        image: uploadedImageUrl
      })).then((data) => {
        console.log(data);

        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          setImageFile(null)
          setOpenCreateProductsDialog(false)
          setFormData(initialState);
          toast({
            title: 'Added Product',
            message: data.payload.message
          })
        }
      })
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item)
  }


  function handleDelete(productId) {
    dispatch(deleteProduct(productId))
      .then(data => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
        }
      })
  }

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  return (
    <Fragment>
      <div className='flex mb-5 w-full justify-end'>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          {currentEditedId ? "Edit Product " : "Add New Product"}
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-col-3'>
        {
          productList && productList.length > 0 ?
            productList.map((productItem) =>
            (<AdminProductTile
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setFormData={setFormData}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              key={productItem._id}
              handleDelete={handleDelete}
            />)) : null
        }
      </div>
      <Sheet open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false)
          setCurrentEditedId(null)
          setFormData(initialState)
        }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Product " : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className='py-6'>
            <CommonForm
              formControls={addProductFormControls}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              buttonText={currentEditedId ? "Edit Product " : "Add New Product"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts