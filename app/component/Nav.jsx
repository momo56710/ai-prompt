"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Provider from "./Provider";
export const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between  w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="promtopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promtopia</p>
      </Link>
      <div className="sm:flex hidden">
        {session ? (
          <div className="flex gap-3 mad:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>

            <Link href="profile">
              <Image
                src={session?.user.image}
                alt="profile"
                style={{ borderRadius: "50%", cursor: "pointer" }}
                width={30}
                height={30}
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((Provider, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    signIn(Provider.id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {session ? (
          <>
            <div className="flex">
              <Image
                src={session?.user.image}
                style={{ borderRadius: "50%", cursor: "pointer" }}
                alt="promtopia Logo"
                width={30}
                height={30}
                className="object-contain"
                onClick={() => {
                  setToggleDropdown((prev) => !prev);
                }}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>

                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    create prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className=" mt-5 w-full black_btn"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((Provider, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    signIn(Provider.id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
