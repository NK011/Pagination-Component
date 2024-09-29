import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [products, setProducts] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [paginationBtns, setPaginationBtns] = useState(1);

    const fetchProducts = async () => {
        try {
            const response = await fetch(
                "https://dummyjson.com/products?limit=100"
            )
                .then((res) => res.json())
                .then((data) => data);

            setProducts(response?.products);
            setPaginationBtns(Math.ceil(response?.products.length / 10));
        } catch (e) {
            console.log(e);
            // window.alert("Error fetching products");
        }
    };

    const handlePageChange = (page) => {
        const newIndex = (page - 1) * 10;
        setActivePage(page);
        setStartIndex(newIndex);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="App">
            <div className="products__list">
                {products.slice(startIndex, startIndex + 10).map((prd) => (
                    <div className="prodcut-card" key={prd.id}>
                        <img src={prd.thumbnail} alt="prodcut__image" />
                        <div className="product__info">
                            <h4>{prd.title}</h4>
                            <p>Price: ${prd.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="products__pagination">
                {[...Array(paginationBtns).keys()].map((p, i) => (
                    <button
                        onClick={() => handlePageChange(i + 1)}
                        className={`pagination__btn ${
                            activePage === i + 1 ? "active" : ""
                        }`}
                        key={i + 1}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default App;
