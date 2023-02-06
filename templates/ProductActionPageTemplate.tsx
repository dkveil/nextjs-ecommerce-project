import React from 'react';
import { ManagerSection, SizeSubformWrapper, InputFileWrapper } from '../containers/managerpage/ManagerPage.styles';
import { useGlobalContext } from '../context/GlobalContext';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import texts from '../containers/managerpage/texts';
import { InputWrapper } from '../components/AccountDetailsForm/AccountDetailsForm.styles';
import { shoesSizes, clotheSizes } from '../containers/productspage/ProductsFilter/ProductsFilter';
import Modal from '../components/Modal/Modal';
import * as Yup from 'yup';
import { ImageCarousel } from '../containers/productpage/ProductInfo/ProductInfo.styles';
import Image from 'next/image';
import { IoIosClose, IoMdCloudUpload } from 'react-icons/io';
import { imageUpload } from '../utils/imageUpload';
import { getInMB } from '../utils/getInMB';
import { patchData, postData } from '../utils/fetchData';
import slugify from 'slugify';
import type { IProduct } from '../types/Product.types';

const categories = ['tshirts', 'hoodies', 'shoes'];

const sortCategoryPrio = [...shoesSizes, ...clotheSizes].reduce(
    (obj: {}, item: string, index: number) => ({ ...obj, [item]: index }),
    0
) as { [id: string]: number };

interface ISizeSubform {
    title?: string;
    inStock?: number;
    availableSizes: string[];
    handleSize: ({ title, inStock }: { title: string; inStock: number }) => void;
    handleDeleteSize: (title: string) => void;
    closeSizeSubform: () => void;
}

export const SizeSubform = ({ title, inStock, handleSize, closeSizeSubform, availableSizes }: ISizeSubform) => {
    const [sizeErrors, setSizeErrors] = React.useState<{ name: string | false; inStock: string | false }>({ name: false, inStock: false });
    const sizeNameRef = React.useRef<HTMLInputElement>(null);
    const sizeInStockRef = React.useRef<HTMLInputElement>(null);

    const { currentLanguage } = useGlobalContext();

    const handleClick = () => {
        if (sizeNameRef.current && sizeInStockRef.current) {
            const sizeName = sizeNameRef.current.value.toUpperCase();
            const sizeInStock = Number(sizeInStockRef.current.value);

            if (!availableSizes.includes(sizeName)) {
                setSizeErrors((prev) => ({ ...prev, name: 'invalidsizename' }));
                return;
            }

            setSizeErrors((prev) => ({ ...prev, name: false }));

            if (sizeInStock.toString().length === 0 || isNaN(Number(sizeInStockRef.current.value)) || sizeInStock < 0) {
                setSizeErrors((prev) => ({ ...prev, inStock: 'invalidsizeinstock' }));
                return;
            }

            setSizeErrors({ name: false, inStock: false });
            handleSize({ title: sizeName, inStock: sizeInStock });
            return;
        }

        setSizeErrors({ name: 'invalidsizename', inStock: 'invalidsizeinstock' });
    };

    React.useEffect(() => {
        if (sizeNameRef.current && title && sizeInStockRef.current && typeof inStock === 'number' && inStock >= 0) {
            sizeNameRef.current.value = title.toString();
            sizeInStockRef.current.value = inStock.toString();
            return;
        }
    }, []);

    return (
        <SizeSubformWrapper>
            <InputWrapper error={Boolean(sizeErrors.name)}>
                <h5>{texts[currentLanguage].sizename}</h5>
                <p>{availableSizes.join(', ')}</p>
                <input id="size-name" ref={sizeNameRef} />
                {sizeErrors.name ? <div className="error-message">{texts[currentLanguage][sizeErrors.name]}</div> : null}
            </InputWrapper>
            <InputWrapper error={Boolean(sizeErrors.inStock)}>
                <h5>{texts[currentLanguage].sizeInStock}</h5>
                <input id="size-inStock" ref={sizeInStockRef} />
                {sizeErrors.inStock ? <div className="error-message">{texts[currentLanguage][sizeErrors.inStock]}</div> : null}
            </InputWrapper>
            <div className="buttons-wrapper">
                <button onClick={handleClick}>add</button>
                <button onClick={closeSizeSubform}>cancel</button>
            </div>
        </SizeSubformWrapper>
    );
};

type IImage = {
    url: string;
};

interface IFormModel {
    engTitle: string;
    polTitle: string;
    engPrice: string;
    polPrice: string;
    engPredescription: string;
    polPredescription: string;
    engDescription: string;
    polDescription: string;
    categoryid: string;
    options: {
        title: string;
        inStock: number;
    }[];
    sold: number;
    images: (File | IImage)[];
}

interface IProductActionPageTemplate {
    action: 'ADD' | 'EDIT';
    product?: IProduct;
}

const ProductActionPageTemplate = ({ action, product }: IProductActionPageTemplate) => {
    const [openSizeSubform, setOpenSizeSubform] = React.useState<boolean>(false);
    const [editingSize, setEditingSize] = React.useState<{ title?: string; inStock?: number }>({ title: undefined, inStock: undefined });
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const { currentLanguage, user, setNotify, setGlobalLoading } = useGlobalContext();

    console.log(sortCategoryPrio);

    const router = useRouter();

    const validationSchema = Yup.object().shape({
        engTitle: Yup.string().required(texts[currentLanguage].engtitlerequired),
        polTitle: Yup.string().required(texts[currentLanguage].poltitlerequired),
        engPrice: Yup.string().required(texts[currentLanguage].eurrequired),
        polPrice: Yup.string().required(texts[currentLanguage].plnrequired),
        engPredescription: Yup.string().required(texts[currentLanguage].engpredescrequired),
        polPredescription: Yup.string().required(texts[currentLanguage].polpredescrequired),
        categoryid: Yup.string().required(texts[currentLanguage].categoryrequired),
        options: Yup.array().min(1, texts[currentLanguage].sizerequired).required(texts[currentLanguage].sizerequired),
        sold: Yup.number().required(texts[currentLanguage].soldrequired).min(0, texts[currentLanguage].invalidformat),
        images: Yup.array().min(1, texts[currentLanguage].imagesrequired).required(texts[currentLanguage].imagesrequired),
    });

    const formik = useFormik<IFormModel>({
        initialValues: {
            engTitle: product?.title.ENG || '',
            polTitle: product?.title.PL || '',
            engPrice: product?.price.ENG.toString() || '',
            polPrice: product?.price.PL.toString() || '',
            engPredescription: product?.predescription.ENG || '',
            polPredescription: product?.predescription.PL || '',
            engDescription: product?.description?.ENG || '',
            polDescription: product?.description?.PL || '',
            categoryid: product?.categoryid || '',
            options: product?.options || [],
            sold: product?.sold || 0,
            images: [],
        },
        onSubmit: async (values) => {
            setGlobalLoading(true);
            try {
                const imagesWithPriority = values.images.map((image, index) => ({ ...image, prio: index })) as (
                    | (File & { prio: number })
                    | (IImage & { prio: number })
                )[];

                const imagesUploaded = imagesWithPriority.filter((image: File | IImage) => (image as IImage).url);
                const imagesToUpload = imagesWithPriority.filter((image: File | IImage) => !(image as IImage).url);

                const oldImages = imagesUploaded.map((image: (File & { prio: number }) | (IImage & { prio: number })) => ({
                    url: (image as IImage).url,
                    prio: image.prio,
                }));

                const newImages = await imageUpload(imagesToUpload as File[]);

                const images = [...oldImages, ...newImages]
                    .sort((a, b) => {
                        if (a.prio > b.prio) {
                            return 1;
                        }
                        if (a.prio < b.prio) {
                            return -1;
                        }
                        return 0;
                    })
                    .map((image) => image.url);

                const productData = {
                    title: {
                        ENG: values.engTitle,
                        PL: values.polTitle,
                    },
                    price: {
                        ENG: values.engPrice,
                        PL: values.polPrice,
                    },
                    predescription: {
                        ENG: values.engPredescription,
                        PL: values.polPredescription,
                    },
                    description: {
                        ENG: values.engDescription,
                        PL: values.polDescription,
                    },
                    categoryid: values.categoryid,
                    images,
                    options: values.options,
                    sold: values.sold,
                    slug: slugify(values.engTitle.toLowerCase()),
                };

                let res;

                if (action === 'ADD') {
                    res = await postData('products', productData, user?.accessToken);
                }

                if (action === 'EDIT' && product) {
                    res = await patchData(`product/${product?._id}`, productData, user?.accessToken);
                }

                const { messageid } = res;

                setNotify(texts[currentLanguage][messageid]);

                if (messageid === 'nopermissions') {
                    router.push('/');
                }

                if (messageid === 'addproductsuccess') {
                    router.push({
                        pathname: '/admin/products',
                        query: {
                            accessToken: user?.accessToken,
                        },
                    });
                }
            } catch (error) {
                setNotify(texts[currentLanguage].unknowerror);
            } finally {
                setGlobalLoading(false);
            }
        },
        validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        enableReinitialize: true,
    });

    const { values, handleSubmit, errors, handleChange, setFieldValue } = formik;

    const availableSizes =
        values.categoryid === 'shoes'
            ? shoesSizes
            : values.categoryid === 'tshirts' || values.categoryid === 'hoodies'
            ? clotheSizes
            : shoesSizes.concat(clotheSizes);

    const handleSize = ({ title, inStock }: { title: string; inStock: number }) => {
        if (values.options.find((option) => option.title === title)) {
            const newOptionState = values.options
                .map((option) => {
                    if (option.title === title) {
                        return { title, inStock };
                    }
                    return option;
                })
                .sort((a, b) => sortCategoryPrio[a.title] - sortCategoryPrio[b.title]);

            setFieldValue('options', newOptionState);
            setOpenSizeSubform(false);
            return;
        }

        setOpenSizeSubform(false);
        setFieldValue('options', [...values.options, { title, inStock }]);
    };

    const handleToggleSizeSubform = ({ title, inStock }: { title?: string; inStock?: number }) => {
        if (openSizeSubform) {
            setEditingSize({ title: undefined, inStock: undefined });
            setOpenSizeSubform(false);
            return;
        }

        if (title && typeof inStock === 'number' && inStock >= 0) {
            setEditingSize({ title, inStock: Number(inStock) });
        }

        setOpenSizeSubform(true);
    };

    const handleDeleteSize = (title: string) => {
        const newOptionState = values.options.filter((item) => item.title !== title);

        setFieldValue('options', newOptionState);
    };

    const handleUploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = e.target.files;
        let newImages = [];
        let errImages = [];

        for (let i = 0; files.length > i; i++) {
            if (files[i].size > 2048 * 1024) {
                errImages.push(i);
                break;
            }

            if (files[i].type !== 'image/jpeg' && files[i].type !== 'image/png') {
                errImages.push(i);
                break;
            }

            newImages.push(files[i]);
        }

        if (errImages.length === 1) setNotify(texts[currentLanguage].fileerror);
        if (errImages.length > 1) setNotify(texts[currentLanguage].fileserror);
        if (errImages.length === 0) setNotify(texts[currentLanguage].fileuploadsuccess);

        setFieldValue('images', values.images.concat(newImages));
    };

    const handleDeleteImage = (id: number) => {
        let newImagesState = [] as (File | IImage)[];

        if (id === 0) {
            newImagesState = values.images.splice(1, values.images.length);
        }

        if (values.images.length > 1 && id !== 0) {
            newImagesState = [...values.images.splice(0, id), ...values.images.splice(id, values.images.length)];
        }

        setFieldValue('images', newImagesState);
    };

    React.useEffect(() => {
        let filtered = false;

        if (values.categoryid === 'shoes' && values.options.every((size) => clotheSizes.includes(size.title))) {
            const filteredSizes = values.options.filter((size) => {
                if (clotheSizes.includes(size.title)) {
                    filtered = true;
                    return false;
                } else return true;
            });

            setFieldValue('options', filteredSizes);
        }

        if (
            (values.categoryid === 'tshirts' || values.categoryid === 'hoodies') &&
            values.options.every((size) => shoesSizes.includes(size.title))
        ) {
            const filteredSizes = values.options.filter((size) => {
                if (shoesSizes.includes(size.title)) {
                    filtered = true;
                    return false;
                } else return true;
            });

            setFieldValue('options', filteredSizes);
        }

        if (filtered) setNotify(texts[currentLanguage].sizeremoved);
    }, [values.categoryid]);

    React.useEffect(() => {
        if (product) {
            setFieldValue(
                'images',
                product.images.map((image) => ({ url: image }))
            );
        }
    }, [product]);

    return (
        <>
            <ManagerSection>
                <div className="container">
                    <div className="manager__header">
                        <h2>{action === 'EDIT' ? texts[currentLanguage].editproduct : texts[currentLanguage].createproduct}</h2>
                    </div>
                    <div className="manager__form-wrapper">
                        <form onSubmit={handleSubmit}>
                            <div className="current-product">
                                <div className="current-product__info">
                                    <div className="inputs-group">
                                        <h4>{texts[currentLanguage].title}</h4>
                                        <InputWrapper error={Boolean(errors.polTitle)}>
                                            <input
                                                id="polTitle"
                                                name="polTitle"
                                                value={values.polTitle}
                                                onChange={handleChange}
                                                placeholder={texts[currentLanguage].inpolish}
                                            />
                                            {errors.polTitle ? <div className="error-message">{errors.polTitle}</div> : null}
                                        </InputWrapper>
                                        <InputWrapper error={Boolean(errors.engTitle)}>
                                            <input
                                                id="engTitle"
                                                name="engTitle"
                                                value={values.engTitle}
                                                onChange={handleChange}
                                                placeholder={texts[currentLanguage].inenglish}
                                            />
                                            {errors.engTitle ? <div className="error-message">{errors.engTitle}</div> : null}
                                        </InputWrapper>
                                    </div>
                                    <div className="inputs-group">
                                        <h4>{texts[currentLanguage].category}</h4>
                                        <InputWrapper error={Boolean(errors.categoryid)}>
                                            <select id="categoryid" value={values.categoryid} onChange={handleChange}>
                                                <option value=""></option>
                                                {categories.map((category) => (
                                                    <option key={category} value={category}>
                                                        {texts[currentLanguage][category]}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.categoryid ? <div className="error-message">{errors.categoryid}</div> : null}
                                        </InputWrapper>
                                    </div>
                                    <div className="inputs-group">
                                        <h4>{texts[currentLanguage].price}</h4>
                                        <InputWrapper error={Boolean(errors.polTitle)}>
                                            <input
                                                id="polPrice"
                                                name="polPrice"
                                                value={values.polPrice}
                                                onChange={handleChange}
                                                placeholder={texts[currentLanguage].inpln}
                                            />
                                            {errors.polPrice ? <div className="error-message">{errors.polPrice}</div> : null}
                                        </InputWrapper>
                                        <InputWrapper error={Boolean(errors.engTitle)}>
                                            <input
                                                id="engPrice"
                                                name="engPrice"
                                                value={values.engPrice}
                                                onChange={handleChange}
                                                placeholder={texts[currentLanguage].ineur}
                                            />
                                            {errors.engPrice ? <div className="error-message">{errors.engPrice}</div> : null}
                                        </InputWrapper>
                                    </div>
                                    <div className="inputs-group">
                                        <h4>{texts[currentLanguage].predesc}</h4>
                                        <InputWrapper error={Boolean(errors.polPredescription)}>
                                            <textarea
                                                id="polPredescription"
                                                name="polPredescription"
                                                value={values.polPredescription}
                                                onChange={handleChange}
                                                placeholder={texts[currentLanguage].inpolish}
                                            />
                                            {errors.polPredescription ? (
                                                <div className="error-message">{errors.polPredescription}</div>
                                            ) : null}
                                        </InputWrapper>
                                        <InputWrapper error={Boolean(errors.engPredescription)}>
                                            <textarea
                                                id="engPredescription"
                                                name="engPredescription"
                                                value={values.engPredescription}
                                                onChange={handleChange}
                                                placeholder={texts[currentLanguage].inenglish}
                                            />
                                            {errors.engPredescription ? (
                                                <div className="error-message">{errors.engPredescription}</div>
                                            ) : null}
                                        </InputWrapper>
                                    </div>
                                    <div className="inputs-group">
                                        <h4>{texts[currentLanguage].desc}</h4>
                                        <InputWrapper error={Boolean(errors.polDescription)}>
                                            <textarea
                                                id="polDescription"
                                                name="polDescription"
                                                value={values.polDescription}
                                                onChange={handleChange}
                                                placeholder={texts[currentLanguage].inpolish}
                                            />
                                            {errors.polDescription ? <div className="error-message">{errors.polDescription}</div> : null}
                                        </InputWrapper>
                                        <InputWrapper error={Boolean(errors.engDescription)}>
                                            <textarea
                                                id="engDescription"
                                                name="engDescription"
                                                value={values.engDescription}
                                                onChange={handleChange}
                                                placeholder={texts[currentLanguage].inenglish}
                                            />
                                            {errors.engDescription ? <div className="error-message">{errors.engDescription}</div> : null}
                                        </InputWrapper>
                                    </div>
                                    <div className="inputs-group">
                                        <h4>{texts[currentLanguage].sizes}</h4>
                                        <InputWrapper error={Boolean(errors.options)}>
                                            {errors.options ? <div className="error-message">{errors.options.toString()}</div> : null}
                                        </InputWrapper>
                                        {values.options.length > 0 && (
                                            <table className="size-group">
                                                <thead>
                                                    <tr>
                                                        <td className="name">{texts[currentLanguage].sizename}</td>
                                                        <td className="instock">{texts[currentLanguage].sizeInStock}</td>
                                                        <td className="button"></td>
                                                        <td className="button"></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {values.options.map((option) => (
                                                        <tr className="size-group__item" key={option.title}>
                                                            <td className="name">{option.title}</td>
                                                            <td className="instock">{option.inStock}</td>
                                                            <td className="button">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleToggleSizeSubform({
                                                                            title: option.title,
                                                                            inStock: option.inStock,
                                                                        })
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>
                                                            </td>
                                                            <td className="button">
                                                                <button type="button" onClick={() => handleDeleteSize(option.title)}>
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                        <button type="button" className="add-size-button" onClick={() => handleToggleSizeSubform({})}>
                                            {texts[currentLanguage].addsize}
                                        </button>
                                    </div>
                                    <div className="inputs-group">
                                        <h4>{texts[currentLanguage].sold}</h4>
                                        <InputWrapper error={Boolean(errors.sold)}>
                                            <input id="sold" name="sold" type="number" value={values.sold} onChange={handleChange} />
                                            {errors.sold ? <div className="error-message">{errors.sold}</div> : null}
                                        </InputWrapper>
                                    </div>
                                </div>
                                <div className="current-product__images">
                                    <div className="inputs-group">
                                        <h4>{texts[currentLanguage].images}</h4>
                                        <InputFileWrapper error={Boolean(errors.images)}>
                                            <label htmlFor="images">
                                                <button type="button" onClick={() => fileInputRef.current?.click()}>
                                                    {texts[currentLanguage].uploadfiles} <IoMdCloudUpload />
                                                </button>
                                                <div
                                                    className="input-file__info"
                                                    onClick={(e) => {
                                                        e.stopPropagation(), e.preventDefault();
                                                    }}
                                                >
                                                    {values.images.length > 0 ? (
                                                        <>
                                                            {values.images.length} {texts[currentLanguage].files}
                                                        </>
                                                    ) : (
                                                        texts[currentLanguage].nofiles
                                                    )}
                                                </div>
                                            </label>
                                            {values.images.length > 0 && (
                                                <ul>
                                                    {values.images.map((file, index) => (
                                                        <li key={index}>
                                                            <div className="uploaded-file">
                                                                <div className="uploaded-file__info">
                                                                    <div className="name">
                                                                        <p>
                                                                            {(file as File).name
                                                                                ? (file as File).name
                                                                                : (file as IImage).url}
                                                                        </p>
                                                                    </div>
                                                                    <span className="size">
                                                                        {(file as File).size ? getInMB((file as File).size) : null}
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    className="uploaded-file__button"
                                                                    onClick={() => handleDeleteImage(index)}
                                                                >
                                                                    <IoIosClose />
                                                                </button>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                id="images"
                                                name="images"
                                                accept="image/png, image/jpeg"
                                                onChange={handleUploadImages}
                                                multiple
                                            />
                                            {errors.images ? <div className="error-message">{errors.images.toString()}</div> : null}
                                        </InputFileWrapper>
                                        {values.images.length > 0 ? (
                                            <>
                                                <div className="image-displayer">
                                                    <button
                                                        className="delete-image-button"
                                                        type="button"
                                                        onClick={() => handleDeleteImage(0)}
                                                    >
                                                        <IoIosClose />
                                                    </button>
                                                    <Image
                                                        alt={
                                                            (values.images[0] as IImage).url
                                                                ? (values.images[0] as IImage).url
                                                                : (values.images[0] as File).name
                                                        }
                                                        src={
                                                            (values.images[0] as IImage).url
                                                                ? (values.images[0] as IImage).url
                                                                : URL.createObjectURL(values.images[0] as File)
                                                        }
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <ImageCarousel>
                                                    <ul id="image-carousel">
                                                        {values.images.slice(1, values.images.length).map((image, index) => (
                                                            <div key={index}>
                                                                <button
                                                                    className="delete-image-button"
                                                                    type="button"
                                                                    onClick={() => handleDeleteImage(index + 1)}
                                                                >
                                                                    <IoIosClose />
                                                                </button>
                                                                <Image
                                                                    src={
                                                                        (image as IImage).url
                                                                            ? (image as IImage).url
                                                                            : URL.createObjectURL(image as File)
                                                                    }
                                                                    alt={
                                                                        (image as IImage).url ? (image as IImage).url : (image as File).name
                                                                    }
                                                                    fill
                                                                    style={{ objectFit: 'cover' }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </ul>
                                                </ImageCarousel>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                <button type="submit" className="create-product-button">
                                    {action === 'EDIT' ? texts[currentLanguage].updateproduct : texts[currentLanguage].addproduct}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </ManagerSection>
            <Modal show={openSizeSubform} closeModal={() => handleToggleSizeSubform({})}>
                <SizeSubform
                    title={editingSize.title}
                    inStock={editingSize.inStock}
                    availableSizes={availableSizes}
                    handleSize={handleSize}
                    handleDeleteSize={handleDeleteSize}
                    closeSizeSubform={() => handleToggleSizeSubform({})}
                />
            </Modal>
        </>
    );
};

export default ProductActionPageTemplate;
