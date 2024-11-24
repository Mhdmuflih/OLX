import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase/Firebase";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

type ProductProps = {
  products: Product[];
  search: string;
  menu: string;
};

const Home = (props: ProductProps) => {
  const [products, setProducts] = useState<Product[]>([]); // Specify type as Product[]

  const searchItem = (props.search || props.menu || "").toLowerCase();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const dataList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            price: data.price,
            category: data.category,
            description: data.description,
            image: data.image,
          } as Product; // Cast as Product type
        });
        setProducts(dataList);
      } catch (error: any) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchData();
  }, []);

  const combinedProducts = [...products, ...(props.products || [])];

  return (
    <div className="grid grid-cols-4 p-5">
      {combinedProducts
        .filter((item) => item.title.toLowerCase().includes(searchItem))
        .map((item, index) => (
          <Link to={"/details"} state={{ item }} key={index}>
            <div className="border border-spacing-1 p-2 ml-3 mt-3">
              <img src={item.image} alt={item.title} className="w-60 h-48" />
              <h1 className="font-bold text-xl">$ {item.price}</h1>
              <h1>{item.title}</h1>
              <h1>{item.category}</h1>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Home;
