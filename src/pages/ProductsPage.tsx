import {ProductList} from "../components/Products/ProductList";
import {ProductForm} from "../components/Forms/Product";
import {Modal} from "../components/Modal";
import {Button} from "../components/ui/button.tsx";

export const ProductsPage = () => {
    // @ts-ignore
    return <div className={'grid h-full grid-rows-[auto_1fr_auto]'}>
        <header
            className={'flex-grow bg-gray-100 rounded-xl p-3 flex flex-col items-center justify-center justify-self-center px-8'}>
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Welcome to Products Page</h1>
                <p className="mb-6">Please, look at the possible products!</p>
            </div>
        </header>

        <main>
            <div className="grid items-center grid-rows-[auto_1fr] gap-4">
                <Modal title="Create a new product" description="Put all the dat into the fields!" trigger={<div className={'flex justify-end my-4'}><Button>Create a new product</Button></div>}>
                    <ProductForm />
                </Modal>
                <ProductList />
            </div>

        </main>

        <footer className="bg-gray-500 text-white p-4">
            <div className="container mx-auto text-center">
                <p>Copyright © 2023 Your Company</p>
            </div>
        </footer>
    </div>
}