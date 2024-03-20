import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { format } from "date-fns";

import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import ProductIcon from "@mui/icons-material/LocalMall";

import { productsApi } from "@store/apis/products.api";

import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";
import { CardContainer, CardIconWrapper, CardMenu } from "@utils/styles/Cards.styled";
import { Product } from "@utils/typings/types/products/products.types";

import { DropdownMenuItem } from "@components/DropdownMenu";
import { Body1Typography, Body2Typography } from "@components/Typography";

import AddToArchiveModal from "../../../App/Modals/AddToArchiveModal/AddToArchiveModal";
import ConfirmModal from "../../../App/Modals/ConfirmModal/ConfirmModal";
import EditProductModal from "../../../App/Modals/EditProductModal/EditProductModal";
import { useModal } from "../../../App/Modals/Modal/useModal.hook";
import ProductInfoModal from "../../../App/Modals/ProductInfoModal/ProductInfoModal";

const ProductCard: FC<Product> = (product) => {
    const { t } = useTranslation();
    const infoModalHook = useModal();
    const changeModalHook = useModal();
    const deleteModalHook = useModal();
    const archiveModalHook = useModal();
    const [deleteProduct] = productsApi.useDeleteProductMutation();

    const handleDelete = async () => {
        await deleteProduct({ id: product.id, shelfId: product.shelfId }).unwrap();
    };

    const menuItems: DropdownMenuItem[] = [
        {
            icon: <InfoIcon color="primary" />,
            titleTranslationKey: "general.otherInfo",
            onClick: infoModalHook.openModal
        },
        {
            icon: <EditIcon color="primary" />,
            titleTranslationKey: "general.edit",
            onClick: changeModalHook.openModal
        },
        {
            icon: <ArchiveIcon color="primary" />,
            titleTranslationKey: "general.addArchive",
            onClick: archiveModalHook.openModal
        },
        {
            icon: <DeleteIcon color="primary" />,
            titleTranslationKey: "general.delete",
            onClick: deleteModalHook.openModal
        }
    ];

    return (
        <CardContainer>
            <CardMenu menuItems={menuItems} />

            <CardIconWrapper>
                <ProductIcon onClick={infoModalHook.openModal} />
            </CardIconWrapper>

            <Body1Typography>{product.name}</Body1Typography>

            <Body2Typography color="text.secondary">
                {t("general.amount")}: {product.amount}
            </Body2Typography>

            <Body2Typography color="text.secondary">
                {t("general.updatedAt")}: {format(new Date(product.updatedAt), DATE_TIME_FORMAT.shortDate)}
            </Body2Typography>

            <ConfirmModal
                modalHook={deleteModalHook}
                titleTranslationKey="modal.deleteProduct.title"
                titleTranslationValues={{ name: product.name }}
                onConfirm={handleDelete}
            />

            <EditProductModal modalHook={changeModalHook} product={product} />

            <ProductInfoModal modalHook={infoModalHook} product={product} />

            <AddToArchiveModal modalHook={archiveModalHook} productId={product.id} />
        </CardContainer>
    );
};

export default ProductCard;
