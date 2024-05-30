import { GetArchivedProductsQuery, GetProductsQuery } from "@utils/typings/types/products/products.types";
import { GetStatisticsDto } from "@utils/typings/types/supplier/supplier.types";
import { GetShipmentProductsQuery } from "@utils/typings/types/shipments/shipments.types";

const PAGE_ORIGIN = import.meta.env.VITE_API_URL;

export const API_URLS = {
    auth: {
        login: `${PAGE_ORIGIN}/api/auth/login`,
        register: `${PAGE_ORIGIN}/api/auth/register`,
        reset: `${PAGE_ORIGIN}/api/auth/reset`,
        recovery: `${PAGE_ORIGIN}/api/auth/recovery`
    },
    users: {
        getUserData: `${PAGE_ORIGIN}/api/users`,
        changePassword: `${PAGE_ORIGIN}/api/users/changePassword`
    },
    storages: {
        main: `${PAGE_ORIGIN}/api/storages`,
        getById: (id: number) => `${PAGE_ORIGIN}/api/storages/${id}`,
        deleteUser: `${PAGE_ORIGIN}/api/storages/deleteUser`,
        addUser: `${PAGE_ORIGIN}/api/storages/addUser`,
        list: `${PAGE_ORIGIN}/api/storages/list`
    },
    shelves: {
        main: `${PAGE_ORIGIN}/api/shelves`,
        getAll: (storageId: number) => `${PAGE_ORIGIN}/api/shelves/${storageId}`
    },
    products: {
        main: `${PAGE_ORIGIN}/api/products/`,
        getAll: ({ shelfId, name, limit, page }: GetProductsQuery) => {
            const baseUrl = `${PAGE_ORIGIN}/api/products/?shelfId=${shelfId}&page=${page}&limit=${limit}`;

            return name ? `${baseUrl}&name=${name}` : baseUrl;
        },
        getArchived: ({ page, limit, name }: GetArchivedProductsQuery) => {
            const baseUrl = `${PAGE_ORIGIN}/api/products/archive/?page=${page}&limit=${limit}`;

            return name ? `${baseUrl}&name=${name}` : baseUrl;
        },
        search: (name: string) => `${PAGE_ORIGIN}/api/products/search/?name=${name}`,
        archive: `${PAGE_ORIGIN}/api/products/archive`
    },
    suppliers: {
        main: `${PAGE_ORIGIN}/api/suppliers/`,
        getStatistics: ({ startDate, endDate }: GetStatisticsDto) => `${PAGE_ORIGIN}/api/suppliers/statistics?startDate=${startDate}&endDate=${endDate}`
    },
    shipments: {
        main: `${PAGE_ORIGIN}/api/shipments/`,
        getAll: ({ startDate, endDate }: GetShipmentProductsQuery) => {
            return `${PAGE_ORIGIN}/api/shipments/?startDate=${startDate}&endDate=${endDate}`;
        },
        delete: (id: number) => `${PAGE_ORIGIN}/api/shipments/${id}`
    }
};
