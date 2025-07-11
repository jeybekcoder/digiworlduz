// 📄 Fayl: src/components/navbar/HeaderTop.tsx
// 🎯 Maqsad: Yuqoridagi HeaderTop qismini 1px aniqlik bilan dizaynga mos qilish
// 📦 Elementlar: chapda “Welcome to Worldwide Electronics Store”, o‘ngda linklar (My Account, Wishlist, Sign In, Compare)
// 🧠 Dizayndan olingan xususiyatlar (DW/index-3.html):
//     - font-size 13px, Rubik
//     - text-gray-600, line-height 24px, height 45px
//     - max-width 1510px, margin 0 auto, padding-x 12px
//     - row = flex + flex-wrap + items-center + mx-[-12px]
//     - col-left = width 755px (md:w-[755px]) + px-[12px]
//     - col-right = width 755px (md:w-[755px]) + px-[12px]
//     - header__welcome = width 731px, height 24px, font 13px Rubik, transition-all
//     - header__action = width 731px, height 45px, flex justify-end
//     - ul = width 383px, height 45px, list-none, no-padding
//     - li = inline-block, height 45px, line-height 45px, px-3, relative, transition-all + after chiziq + transform
//     - a = inline-block, whitespace-nowrap, align-middle, text-[13px], leading-[45px]

import Link from "next/link"

export default function HeaderTop() {
  return (
    <div className="w-full h-[45px] bg-[#ffffff] border-b border-gray-200 text-[13px] text-gray-600 font-[Rubik] leading-[24px]">
      <div className="max-w-[1510px] w-full h-full mx-auto px-[12px]">
        <div className="flex flex-wrap items-center mx-[-12px]">
          {/* Chap matn */}
          <div className="hidden md:block md:w-[755px] max-w-full px-[12px]">
            <div className="w-[731px] h-[24px]">
              <span className="text-[13px] leading-[24px] transition-all duration-300 ease-out">
                Assalomu Aleykum, Xush kelipsiz!
              </span>
            </div>
          </div>

          {/* O‘ng linklar */}
          <div className="w-full md:w-[755px] max-w-full px-[12px]">
            <div className="w-[731px] h-[45px] flex justify-center md:justify-end items-center">
              <ul className="w-[383px] h-[45px] list-none p-0 m-0 flex">
                <li className="inline-block h-[45px] leading-[45px] px-[20px] relative transition-all duration-300 ease-out after:content-[''] after:absolute after:top-[22.5px] after:right-0 after:w-px after:h-[13px] after:bg-[#ebebeb] after:transform after:translate-y-[-6.5px] last:after:hidden">
                  <Link href="#" className="inline-block whitespace-nowrap align-middle text-left text-[13px] leading-[45px] transition-all duration-300 ease-out hover:text-primary">
                    My Account
                  </Link>
                </li>
                <li className="inline-block h-[45px] leading-[45px] px-[20px] relative transition-all duration-300 ease-out after:content-[''] after:absolute after:top-[22.5px] after:right-0 after:w-px after:h-[13px] after:bg-[#ebebeb] after:transform after:translate-y-[-6.5px] last:after:hidden">
                  <Link href="#" className="inline-block whitespace-nowrap align-middle text-left text-[13px] leading-[45px] transition-all duration-300 ease-out hover:text-primary">
                    My Wishlist
                  </Link>
                </li>
                <li className="inline-block h-[45px] leading-[45px] px-[20px] relative transition-all duration-300 ease-out after:content-[''] after:absolute after:top-[22.5px] after:right-0 after:w-px after:h-[13px] after:bg-[#ebebeb] after:transform after:translate-y-[-6.5px] last:after:hidden">
                  <Link href="#" className="inline-block whitespace-nowrap align-middle text-left text-[13px] leading-[45px] transition-all duration-300 ease-out hover:text-primary">
                    Sign In
                  </Link>
                </li>
                <li className="inline-block h-[45px] leading-[45px] px-[20px] relative transition-all duration-300 ease-out last:after:hidden">
                  <Link href="#" className="inline-block whitespace-nowrap align-middle text-left text-[13px] leading-[45px] transition-all duration-300 ease-out hover:text-primary">
                    Compare
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
