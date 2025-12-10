import { ReactNode } from "react";

type ProductFilters = {
  value: "all" | "food" | "drink";
  label: "Qualsiasi tipo" | "Cibo" | "Bevanda";
};

type OrderFilters = {
  value: "all" | "delivered" | "unconfirmed" | "ready" | "drink";
  label: "Qualsiasi stato" | "Consegnato" | "In attesa" | "Pronto";
};

export type FilterOption = ProductFilters | OrderFilters;

type ProductSort = {
  label:
    | "Data: più recente"
    | "Data: meno recente"
    | "Prezzo: dal più basso"
    | "Prezzo: dal più alto"
    | "Stock: minimo"
    | "Stock: massimo";
  value:
    | "most-recent"
    | "less-recent"
    | "price-asc"
    | "price-desc"
    | "min-stock"
    | "max-stock";
};

type OrderSort = {
  label:
    | "Data: più recente"
    | "Data: meno recente"
    | "Prezzo: dal più basso"
    | "Prezzo: dal più alto";
  value: "most-recent" | "less-recent" | "price-asc" | "price-desc";
};

export type SortOption = OrderSort | ProductSort;

export const TYPE_OPTIONS: FilterOption[] = [
  { value: "all", label: "Qualsiasi tipo" },
  { value: "drink", label: "Bevanda" },
  { value: "food", label: "Cibo" },
];

export const STATUS_OPTIONS: FilterOption[] = [
  { value: "all", label: "Qualsiasi stato" },
  { value: "delivered", label: "Consegnato" },
  { value: "unconfirmed", label: "In attesa" },
  { value: "ready", label: "Pronto" },
];

export const PRODUCT_SORTBY_OPTIONS: SortOption[] = [
  { label: "Data: più recente", value: "most-recent" },
  { label: "Data: meno recente", value: "less-recent" },
  { label: "Prezzo: dal più basso", value: "price-asc" },
  { label: "Prezzo: dal più alto", value: "price-desc" },
  { label: "Stock: minimo", value: "min-stock" },
  { label: "Stock: massimo", value: "max-stock" },
];

export const ORDER_SORTBY_OPTIONS: SortOption[] = [
  { label: "Data: più recente", value: "most-recent" },
  { label: "Data: meno recente", value: "less-recent" },
  { label: "Prezzo: dal più basso", value: "price-asc" },
  { label: "Prezzo: dal più alto", value: "price-desc" },
];

//----------------------------------------------------------

export type DateRange = "last-7-days" | "last-month" | "last-year";

export type DateRangeParams = {
  dateRange: DateRange;
};

export type ProductParams = {
  type: string;
  sort: string;
  query: string;
  page: string;
};

export type OrderParams = {
  status: string;
  sort: string;
  query: string;
  page: string;
};

//----------------------------------------------------------

export type CredentialsFormProps = {
  title: "Login" | "Registrazione";
  isActive: boolean;
  onChangeForm: () => void;
};

// products page

type ProductType = "drink" | "food";

export type Product = {
  id: number;
  created_at: string;
  name: string;
  description: string;
  regularPrice: number;
  discount: number | null;
  type: ProductType;
  image: string[];
  details: string;
  ingredients: string;
  info: string;
  quantity: number;
};

export type ProductProto = {
  id: number;
  created_at: string;
  name: string;
  description: string;
  regularPrice: number;
  discount: number | null;
  type: ProductType;
  details: string;
  ingredients: string;
  info: string;
  quantity: number;
};

// orders page

export type OrderInfo = {
  id: string;
  orderDate: string;
  status: string;
  name: string;
  email: string;
  totalCost: number;
  order_items: OrderItem[];
};

export type OrdersInfo = {
  id: string;
  orderDate: string;
  status: string;
  userId: {
    image: string;
  };
  name: string;
  email: string;
  totalCost: number;
  order_items: OrderItem[];
};

export type LatestOrdersInfo = {
  id: string;
  users: {
    image: string;
  };
  orderDate: string;
  status: string;
  name: string;
  email: string;
  totalCost: number;
};

export type OrderItem = {
  quantity: number;
  productId: {
    name: string;
    regularPrice: number;
  };
};

// dropdown menu context

export type MenusContextValues = {
  openId: string;
  close: () => void;
  open: (id: string) => void;
};

export type MenusProps = {
  children: ReactNode;
};

export type MenuProps = {
  children: ReactNode;
};

export type ToggleProps = {
  id: string;
  disabled?: boolean;
  className: string;
  ariaLabel: string;
  children: ReactNode;
};

export type ListProps = {
  id: string;
  children: ReactNode;
};

export type ButtonProps = {
  children: ReactNode;
  icon: ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: string;
  type: "delete" | "confirm" | "done";
  disabled?: boolean;
};

export type LinkButtonProps = {
  children: ReactNode;
  icon: ReactNode;
  href: string;
};

// update product form

export type UpdateProductFormInputs = {
  name: string;
  regularPrice: number;
  discount: number;
  quantity: number;
  type: "food" | "drink";
  description: string;
  ingredients: string;
  info: string;
  details: string;
  image?: FileList;
};

export type BestSeller = {
  product_id: number;
  product_name: string;
  product_type: string;
  total_count: number;
};

export type Data = {
  value: string;
  totalRevenues?: number;
  totalOrders?: number;
  fullDate: Date;
  statusCounts?: { delivered: number; ready: number; unconfirmed: number };
};

export type NavLink = {
  name: string;
  href: string;
  icon: ReactNode;
};

export type DialogType =
  | "confirm"
  | "done"
  | "delete"
  | "add"
  | "cancel"
  | null;

export type DialogData = {
  type: DialogType;
  name?: string;
  itemId?: number;
  itemName?: string;
  // status?: string;
};
