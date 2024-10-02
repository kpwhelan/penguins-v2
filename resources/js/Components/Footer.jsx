import { Typography } from "@material-tailwind/react";
import ApplicationLogo from "./ApplicationLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  return (
    <footer className="w-full bg-white p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        <ApplicationLogo className=" w-56" />
        <div className="w-fit">
            <p className="text-black">Check Us Out On Social Media!</p>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 justify-around mt-2">
            <li>
                <Typography
                as="a"
                href="https://www.facebook.com/granitestatepenguins/"
                target="_blank"
                color="blue-gray"
                //   className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                <FontAwesomeIcon size="4x" icon={faFacebook} />
                </Typography>
            </li>
            <li>
                <Typography
                as="a"
                href="https://www.instagram.com/rowdypenguins/"
                target="_blank"
                color="blue-gray"
                //   className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                <FontAwesomeIcon size="4x" icon={faInstagram} />
                </Typography>

            </li>
            </ul>
        </div>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; {new Date().getFullYear()} Granite State Penguins
      </Typography>
    </footer>
  );
}
