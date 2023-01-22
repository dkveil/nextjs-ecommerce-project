import { ProductsHeaderWrapper } from './ProductsHeader.styles';

const ProductsHeader = ({ header }: { header: string }) => {
    return (
        <ProductsHeaderWrapper>
            <div className="container">
                <h1 className="products-header__title">{header}</h1>
                <p className="products-header__description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste dolore ipsa voluptate explicabo quia quam quidem placeat
                    voluptates tenetur deleniti, unde inventore ducimus, suscipit, ut deserunt voluptatibus ex architecto. Animi.
                </p>
            </div>
        </ProductsHeaderWrapper>
    );
};

export default ProductsHeader;
