import { Typography } from "@material-tailwind/react";
import back from "../img/slider/anasayfa.png"

export function FooterBook() {
  return (
    <footer className="footer flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between bg-black text-white my-0 px-5">
      <Typography color="blue-gray" className="font-normal">
        &copy; 2023 Bahar 
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 text-white">
        <li>
          <Typography
            as="a"
            href="#"
           
            className="font-normal transition-colors text-white hover:text-blue-500 focus:text-blue-500"
          >
            About Us
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors text-white hover:text-blue-500 focus:text-blue-500"
          >
            License
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors text-white hover:text-blue-500 focus:text-blue-500"
          >
            Contribute
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors text-white hover:text-blue-500 focus:text-blue-500"
          >
            Contact Us
          </Typography>
        </li>
      </ul>
      <div className="img position absolute bottom-[2rem] right-0" >
        <img src={back} alt=""  width="500px"/>
      </div>
    </footer>
  );
}

export default FooterBook;