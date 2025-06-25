import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { EditProductModal } from "./EditProductModal";
import { AddProductModal } from "./AddProductModal";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  company: string;
  status: "In Stock" | "Out of Stock";
  image: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Watch",
    category: "Accessories",
    price: 20,
    company: "Google",
    status: "In Stock",
    image: "⌚",
  },
  {
    id: 2,
    name: "Mobile",
    category: "Telecommunication",
    price: 500,
    company: "Webflow",
    status: "Out of Stock",
    image: "📱",
  },
  {
    id: 3,
    name: "Laptop",
    category: "Note Book",
    price: 800,
    company: "Facebook",
    status: "Out of Stock",
    image: "💻",
  },
  {
    id: 4,
    name: "TV",
    category: "Digital",
    price: 250,
    company: "Twitter",
    status: "In Stock",
    image: "📺",
  },
  {
    id: 5,
    name: "Camera",
    category: "Digital",
    price: 100,
    company: "YouTube",
    status: "Out of Stock",
    image: "📷",
  },
  {
    id: 6,
    name: "Perfume",
    category: "Cosmetics",
    price: 25,
    company: "Reddit",
    status: "In Stock",
    image: "🧴",
  },
  {
    id: 7,
    name: "Ear pods",
    category: "Digital",
    price: 45,
    company: "Spotify",
    status: "Out of Stock",
    image: "🎧",
  },
  {
    id: 8,
    name: "Wireless Charger",
    category: "Digital",
    price: 10,
    company: "Pinterest",
    status: "In Stock",
    image: "🔌",
  },
  {
    id: 9,
    name: "Torch",
    category: "Light",
    price: 20,
    company: "Twitch",
    status: "Out of Stock",
    image: "🔦",
  },
];

type SortField = "name" | "category" | "price" | "company" | "status";
type SortDirection = "asc" | "desc";

export function ProductListPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([
    1, 4, 6, 8,
  ]);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue: string | number = a[sortField];
    let bValue: string | number = b[sortField];

    if (sortField === "price") {
      aValue = a.price;
      bValue = b.price;
    } else {
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
    }

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleDelete = (productId: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
    setSelectedProducts((prev) => prev.filter((id) => id !== productId));
  };

  const handleEdit = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setEditingProduct({ ...product });
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = (editedProduct: Product) => {
    if (editedProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editedProduct.id ? editedProduct : p))
      );
      setIsEditModalOpen(false);
      setEditingProduct(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const newId = Math.max(...products.map((p) => p.id)) + 1;
    setProducts((prev) => [...prev, { ...newProduct, id: newId }]);
    setIsAddModalOpen(false);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === currentProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(currentProducts.map((p) => p.id));
    }
  };

  const displayStart = startIndex + 1;
  const displayEnd = Math.min(endIndex, totalProducts);

  return (
    <div className="product-list-container">
      {/* Header */}
      <div className="product-list-header">
        <div className="product-list-header-left">
          <h1 className="product-list-title">Product List</h1>
          <div className="product-search">
            <Search className="product-search-icon" />
            <input
              placeholder="Search for product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="product-search-input"
            />
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus
            style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
          />
          Add New Product
        </button>
      </div>

      {/* Products Table */}
      <div className="product-table-container">
        <div className="product-table-header">
          <h2 className="product-table-title">All Products</h2>
          <p className="product-table-count">
            {displayStart} - {displayEnd} of {totalProducts}
          </p>
        </div>

        <div className="product-table">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      selectedProducts.length === currentProducts.length &&
                      currentProducts.length > 0
                    }
                    onChange={handleSelectAll}
                    className="checkbox"
                  />
                </th>
                <th>
                  <button
                    onClick={() => handleSort("name")}
                    className="product-table-header-btn"
                  >
                    ⭐ Product Name
                    <div className="product-table-sort-icons">
                      <ChevronUp
                        className={`product-table-sort-icon ${
                          sortField === "name" && sortDirection === "asc"
                            ? "active"
                            : ""
                        }`}
                      />
                      <ChevronDown
                        className={`product-table-sort-icon ${
                          sortField === "name" && sortDirection === "desc"
                            ? "active"
                            : ""
                        }`}
                      />
                    </div>
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleSort("category")}
                    className="product-table-header-btn"
                  >
                    📁 Category
                    <div className="product-table-sort-icons">
                      <ChevronUp
                        className={`product-table-sort-icon ${
                          sortField === "category" && sortDirection === "asc"
                            ? "active"
                            : ""
                        }`}
                      />
                      <ChevronDown
                        className={`product-table-sort-icon ${
                          sortField === "category" && sortDirection === "desc"
                            ? "active"
                            : ""
                        }`}
                      />
                    </div>
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleSort("price")}
                    className="product-table-header-btn"
                  >
                    💰 Price
                    <div className="product-table-sort-icons">
                      <ChevronUp
                        className={`product-table-sort-icon ${
                          sortField === "price" && sortDirection === "asc"
                            ? "active"
                            : ""
                        }`}
                      />
                      <ChevronDown
                        className={`product-table-sort-icon ${
                          sortField === "price" && sortDirection === "desc"
                            ? "active"
                            : ""
                        }`}
                      />
                    </div>
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleSort("company")}
                    className="product-table-header-btn"
                  >
                    🏢 Company
                    <div className="product-table-sort-icons">
                      <ChevronUp
                        className={`product-table-sort-icon ${
                          sortField === "company" && sortDirection === "asc"
                            ? "active"
                            : ""
                        }`}
                      />
                      <ChevronDown
                        className={`product-table-sort-icon ${
                          sortField === "company" && sortDirection === "desc"
                            ? "active"
                            : ""
                        }`}
                      />
                    </div>
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleSort("status")}
                    className="product-table-header-btn"
                  >
                    📊 Status
                    <div className="product-table-sort-icons">
                      <ChevronUp
                        className={`product-table-sort-icon ${
                          sortField === "status" && sortDirection === "asc"
                            ? "active"
                            : ""
                        }`}
                      />
                      <ChevronDown
                        className={`product-table-sort-icon ${
                          sortField === "status" && sortDirection === "desc"
                            ? "active"
                            : ""
                        }`}
                      />
                    </div>
                  </button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="checkbox"
                    />
                  </td>
                  <td>
                    <div className="product-table-product">
                      <div className="product-table-product-image">
                        {product.image.startsWith("data:image") ? (
                          <img src={product.image} alt={product.name} />
                        ) : (
                          product.image
                        )}
                      </div>
                      <span className="product-table-product-name">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="product-table-category">{product.category}</td>
                  <td className="product-table-price">${product.price}</td>
                  <td>
                    <div className="product-table-company">
                      <div className="product-table-company-icon">
                        <img
                          src={`/companies/${product.company}.png`}
                          alt={product.company}
                        />
                      </div>
                      <span className="product-table-company-name">
                        {product.company}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {product.status === "In Stock" ? (
                        <span className="product-table-status-badge in-stock">
                          <div className="product-table-status-dot in-stock"></div>
                          In Stock
                        </span>
                      ) : (
                        <span className="product-table-status-badge out-of-stock">
                          <div className="product-table-status-dot out-of-stock"></div>
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="product-table-actions">
                      <button
                        className="product-table-action-btn"
                        onClick={() => handleEdit(product.id)}
                      >
                        <Edit style={{ width: "1rem", height: "1rem" }} />
                      </button>
                      <button
                        className="product-table-action-btn"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 style={{ width: "1rem", height: "1rem" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="product-table-pagination">
          <div className="product-table-pagination-info">
            {displayStart} - {displayEnd} of {totalProducts}
          </div>
          <div className="product-table-pagination-controls">
            <div className="product-table-pagination-rows">
              <span className="product-table-pagination-rows-text">
                Rows per page:
              </span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="product-table-pagination-select"
              >
                <option value={5}>5</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="product-table-pagination-nav">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="product-table-pagination-btn"
              >
                <ChevronLeft style={{ width: "1rem", height: "1rem" }} />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="product-table-pagination-btn"
              >
                <ChevronRight style={{ width: "1rem", height: "1rem" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={handleCancelEdit}
        product={editingProduct}
        onSave={handleSaveEdit}
      />
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
}
