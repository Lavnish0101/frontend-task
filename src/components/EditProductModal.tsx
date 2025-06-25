import {
  X,
  Star,
  Image as ImageIcon,
  DollarSign,
  Briefcase,
  CheckSquare,
  ChevronDown,
} from "lucide-react";
import type { Product } from "./ProductListPage";
import { CustomSelect } from "./CustomSelect";
import { useState, useEffect } from "react";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (product: Product) => void;
}

export function EditProductModal({
  isOpen,
  onClose,
  product: initialProduct,
  onSave,
}: EditProductModalProps) {
  const [product, setProduct] = useState<Product | null>(initialProduct);

  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  if (!isOpen || !product) return null;

  const handleSave = () => {
    onSave(product);
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    if (product) {
      setProduct({ ...product, [field]: value });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit product</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X style={{ width: "1.5rem", height: "1.5rem" }} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">
                <Star style={{ width: "1rem", height: "1rem" }} /> Product name
              </label>
              <input
                type="text"
                defaultValue={product.name}
                className="form-input"
              />
            </div>
            <div className="form-field">
              <label className="form-label">
                <ImageIcon style={{ width: "1rem", height: "1rem" }} /> Product
                photo
              </label>
              <div className="product-photo">
                <div className="photo-preview">
                  {product.image.startsWith("data:image") ? (
                    <img src={product.image} alt="Product" />
                  ) : (
                    product.image
                  )}
                </div>
                <div className="photo-actions">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleInputChange("image", reader.result as string);
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                    style={{ display: "none" }}
                    id="edit-photo-upload"
                  />
                  <label
                    htmlFor="edit-photo-upload"
                    className="photo-action-btn"
                  >
                    Edit
                  </label>
                  <span className="photo-action-divider">|</span>
                  <button
                    className="photo-action-btn"
                    onClick={() => handleInputChange("image", "")}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">
                <ChevronDown style={{ width: "1rem", height: "1rem" }} />{" "}
                Category
              </label>
              <CustomSelect
                options={[
                  { value: "Accessories", label: "Accessories" },
                  { value: "Telecommunication", label: "Telecommunication" },
                  { value: "Note Book", label: "Note Book" },
                  { value: "Digital", label: "Digital" },
                  { value: "Cosmetics", label: "Cosmetics" },
                  { value: "Light", label: "Light" },
                ]}
                selected={{ value: product.category, label: product.category }}
                onChange={(value) => handleInputChange("category", value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label">
                <DollarSign style={{ width: "1rem", height: "1rem" }} /> Price
                (in $)
              </label>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  handleInputChange("price", Number(e.target.value))
                }
                className="form-input"
              />
            </div>
            <div className="form-field">
              <label className="form-label">
                <Briefcase style={{ width: "1rem", height: "1rem" }} /> Company
              </label>
              <CustomSelect
                options={[
                  {
                    value: "Google",
                    label: (
                      <span>
                        <img
                          src="/companies/Google.png"
                          alt="Google"
                          style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "0.5rem",
                          }}
                        />
                        Google
                      </span>
                    ),
                  },
                  {
                    value: "Webflow",
                    label: (
                      <span>
                        <img
                          src="/companies/Webflow.png"
                          alt="Webflow"
                          style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "0.5rem",
                          }}
                        />
                        Webflow
                      </span>
                    ),
                  },
                  {
                    value: "Facebook",
                    label: (
                      <span>
                        <img
                          src="/companies/Facebook.png"
                          alt="Facebook"
                          style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "0.5rem",
                          }}
                        />
                        Facebook
                      </span>
                    ),
                  },
                  {
                    value: "Twitter",
                    label: (
                      <span>
                        <img
                          src="/companies/Twitter.png"
                          alt="Twitter"
                          style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "0.5rem",
                          }}
                        />
                        Twitter
                      </span>
                    ),
                  },
                  {
                    value: "YouTube",
                    label: (
                      <span>
                        <img
                          src="/companies/YouTube.png"
                          alt="YouTube"
                          style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "0.5rem",
                          }}
                        />
                        YouTube
                      </span>
                    ),
                  },
                  {
                    value: "Reddit",
                    label: (
                      <span>
                        <img
                          src="/companies/Reddit.png"
                          alt="Reddit"
                          style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "0.5rem",
                          }}
                        />
                        Reddit
                      </span>
                    ),
                  },
                  {
                    value: "Spotify",
                    label: (
                      <span>
                        <img
                          src="/companies/Spotify.png"
                          alt="Spotify"
                          style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "0.5rem",
                          }}
                        />
                        Spotify
                      </span>
                    ),
                  },
                  {
                    value: "Pinterest",
                    label: (
                      <span>
                        <img
                          src="/companies/Pinterest.png"
                          alt="Pinterest"
                          style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "0.5rem",
                          }}
                        />
                        Pinterest
                      </span>
                    ),
                  },
                  {
                    value: "Twitch",
                    label: (
                      <span>
                        <img
                          src="/companies/Twitch.png"
                          alt="Twitch"
                          style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "0.5rem",
                          }}
                        />
                        Twitch
                      </span>
                    ),
                  },
                ]}
                selected={{
                  value: product.company,
                  label: (
                    <span>
                      <img
                        src={`/companies/${product.company}.png`}
                        alt={product.company}
                        style={{
                          width: "1rem",
                          height: "1rem",
                          marginRight: "0.5rem",
                        }}
                      />
                      {product.company}
                    </span>
                  ),
                }}
                onChange={(value) => handleInputChange("company", value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label">
                <CheckSquare style={{ width: "1rem", height: "1rem" }} /> Status
              </label>
              <CustomSelect
                options={[
                  {
                    value: "In Stock",
                    label: (
                      <span className="status-badge in-stock">In Stock</span>
                    ),
                  },
                  {
                    value: "Out of Stock",
                    label: (
                      <span className="status-badge out-of-stock">
                        Out of Stock
                      </span>
                    ),
                  },
                ]}
                selected={{
                  value: product.status,
                  label: (
                    <span
                      className={`status-badge ${product.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {product.status}
                    </span>
                  ),
                }}
                onChange={(value) =>
                  handleInputChange(
                    "status",
                    value as "In Stock" | "Out of Stock"
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
