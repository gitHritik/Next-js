import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { useRef } from "react";
import { useState } from "react";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="flex flex-col  md:flex-row md:justify-start justify-center items-center bg-white py-2 shadow-lg sticky top-0  z-50">
      <div className="logo mr-auto md:mx-6">
        <Link href={"/"}>
          <a>
            <Image src="/logo.webp" alt="" width={200} height={40} />
          </a>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex  items-center space-x-10 font-bold md:text-sm">
          <Link href={"/tshirts"}>
            <a>
              <li className="hover:text-pink-500">Tshirts</li>
            </a>
          </Link>
          <Link href={"/hoodies"}>
            <a>
              <li className="hover:text-pink-500">Hoodies</li>
            </a>
          </Link>
          <Link href={"/stickers"}>
            <a>
              <li className="hover:text-pink-500">Stickers</li>
            </a>
          </Link>
          <Link href={"/mugs"}>
            <a>
              <li className="hover:text-pink-500">Mugs</li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="cart item-center cursor-pointer absolute right-0 top-4 mx-5 flex">
        <span
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
        >
          {dropdown && (
            <div
              onMouseOver={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }}
              className="absolute right-12 bg-white shadow-lg border top-7 rounded-md px-5 w-36"
            >
              <ul>
                <Link href={"/myaccout"}>
                  <a>
                    <li className="py-1 hover:text-pink-700 text-sm font-bold">
                      My Account
                    </li>
                  </a>
                </Link>
                <Link href={"/orders"}>
                  <a>
                    <li className="py-1 hover:text-pink-700 text-sm font-bold">
                      Orders
                    </li>
                  </a>
                </Link>
                <li
                  onClick={logout}
                  className="py-1 hover:text-pink-700 text-sm font-bold"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}

          {user.value && (
            <MdAccountCircle className="md:text-3xl text-xl mx-3" />
          )}
        </span>
        {!user.value && (
          <Link href={"/login"}>
            <a>
              <button className="bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2">
                Login
              </button>
            </a>
          </Link>
        )}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="md:text-3xl text-xl"
        />
      </div>

      <div
        ref={ref}
        className={`w-72 h-[100vh] z-10 sideCart overflow-y-scroll absolute top-0 right-0 bg-pink-100 px-8 p-10 transform transition-transform ${
          Object.keys(cart).length !== 0 ? `translate-x-0` : `translate-x-full`
        }`}
      >
        <h2 className="font-bold text-xl">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 text-2xl cursor-pointer text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 font-normal">Your cart is empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">{cart[k].name}</div>
                  <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].varient
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                    <span className="mx-2 text-sm"> {cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].varient
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                  </div>
                  <div></div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="font-bold my-2">Subtotal:₹{subTotal}</div>
        <div className="flex ">
          <Link href={"/checkout"}>
            <button className="flex mr-2   text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
              <BsFillBagCheckFill className="m-1" />
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
