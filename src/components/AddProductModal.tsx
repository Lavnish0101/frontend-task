import {
  X,
  Star,
  Image as ImageIcon,
  DollarSign,
  Briefcase,
  CheckSquare,
  ChevronDown,
  Upload,
} from "lucide-react";
import type { Product } from "./ProductListPage";
import { CustomSelect } from "./CustomSelect";
import { useState } from "react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Omit<Product, "id">) => void;
}

export function AddProductModal({
  isOpen,
  onClose,
  onAdd,
}: AddProductModalProps) {
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "Accessories",
    price: 0,
    company: "Google",
    status: "In Stock",
    image: "",
  });

  if (!isOpen) return null;

  const handleAdd = () => {
    onAdd(newProduct);
  };

  const handleInputChange = (field: keyof Omit<Product, "id">, value: any) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add new product</h2>
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
                value={newProduct.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-field">
              <label className="form-label">
                <ImageIcon style={{ width: "1rem", height: "1rem" }} /> Product
                photo
              </label>
              <div className="photo-upload-dropzone">
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
                  className="file-input"
                />
                {newProduct.image ? (
                  <img
                    src={newProduct.image}
                    alt="Product"
                    className="photo-preview"
                  />
                ) : (
                  <>
                    <Upload className="photo-upload-icon" />
                    <p className="photo-upload-text">
                      <span className="photo-upload-text-highlight">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="photo-upload-subtext">
                      SVG, PNG, JPG or GIF (max. 800 x 400px)
                    </p>
                  </>
                )}
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
                selected={{
                  value: newProduct.category,
                  label: newProduct.category,
                }}
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
                value={newProduct.price}
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
                    value: "Youtube",
                    label: (
                      <span>
                        <img
                          src="/companies/Youtube.png"
                          alt="Youtube"
                          style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "0.5rem",
                          }}
                        />
                        Youtube
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
                  value: newProduct.company,
                  label: (
                    <span>
                      <img
                        src={`/companies/${newProduct.company}.png`}
                        alt={newProduct.company}
                        style={{
                          width: "1rem",
                          height: "1rem",
                          marginRight: "0.5rem",
                        }}
                      />
                      {newProduct.company}
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
                  value: newProduct.status,
                  label: (
                    <span
                      className={`status-badge ${newProduct.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {newProduct.status}
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
          <button className="btn btn-primary" onClick={handleAdd}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
