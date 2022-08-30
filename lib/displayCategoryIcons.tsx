import { GoDeviceMobile, GoLaw } from "react-icons/go";
import {
  AiFillAndroid,
  AiFillRead,
  AiOutlineAntDesign,
  AiOutlineAudit,
  AiOutlineBook,
  AiOutlineLink,
  AiOutlineShoppingCart,
  AiOutlineTranslation,
} from "react-icons/ai";
import { BsApple, BsPencilSquare, BsSearch } from "react-icons/bs";
import { IoLogoJavascript, IoLogoPython } from "react-icons/io";
import { FaAws, FaBloggerB, FaHatCowboy, FaWordpress } from "react-icons/fa";
import { MdAccountBalance, MdAnalytics, MdArticle, MdCopyright, MdCorporateFare, MdOutlineAccountBalance, MdOutlineControlCamera } from "react-icons/md";
import { GiArchiveResearch, GiBookmarklet, GiMegaphone, GiMoneyStack } from "react-icons/gi";
import { SiAdobeillustrator, SiAdobephotoshop, SiGhost, SiGoogleanalytics, SiMicrosoftexcel, SiProducthunt } from "react-icons/si";
import { BiAnalyse, BiBuildingHouse, BiWorld } from "react-icons/bi";
import { TbBoxModel, TbBuildingSkyscraper, TbFaceId, TbOval, TbReceiptTax, TbZoomMoney } from "react-icons/tb";
import { IoGameControllerSharp, IoLogoWebComponent } from "react-icons/io5";

export default function displayCategoryIcons(icon: string) {
  switch (icon) {
    case "Mobile App Developer":
      return <GoDeviceMobile />;
    case "Android App Developer":
      return <AiFillAndroid />;
    case "Iphone App Developer":
      return <BsApple />;
    case "eCommerce":
      return <AiOutlineShoppingCart />;
    case "JavaScript Developer":
      return <IoLogoJavascript />;
    case "Amazon Web services":
      return <FaAws />;
    case "Python":
      return <IoLogoPython />;
    case "Wordpress":
      return <FaWordpress />;
    case "Article Writing":
      return <MdArticle />;
    case "Proofreading":
      return <AiFillRead />;
    case "Link Building":
      return <AiOutlineLink />;
    case "Copywriting":
      return <MdCopyright />;
    case "Web Search":
      return <BsSearch />;
    case "Legal":
      return <GoLaw />;
    case "Content Writing":
      return <BsPencilSquare />;
    case "Technical Writing":
      return <GiBookmarklet />;
    case "Blogging":
      return <FaBloggerB />;
    case "Research":
      return <GiArchiveResearch />;
    case "Translation":
      return <AiOutlineTranslation />;
    case "Ghostwriting":
      return <SiGhost />;
    case "SEO Analytics":
      return <SiGoogleanalytics />;
    case "SEO Auditing":
      return <AiOutlineAudit />;
    case "White Hat SEO":
      return <FaHatCowboy />;
    case "SEO Writing":
      return <BiAnalyse />;
    case "SEOMoz":
      return <MdAnalytics />;
    case "Brand Awareness":
      return <GiMegaphone />;
    case "Internet Marketing":
      return <BiWorld />;
    case "3D Modelling":
      return <TbBoxModel />;
    case "Banner Design":
      return <AiOutlineAntDesign />;
    case "Logo Design":
      return <IoLogoWebComponent />;
    case "Illustration":
      return <SiAdobeillustrator />;
    case "PhotoShop":
      return <SiAdobephotoshop />;
    case "Product Design":
      return <SiProducthunt />;
    case "Building Design":
      return <BiBuildingHouse />;
    case "UI/UX":
      return <TbFaceId />;
    case "Game Design":
      return <IoGameControllerSharp />;
    case "eBook Design":
      return <AiOutlineBook />;
    case "Accounting":
      return <MdOutlineAccountBalance />;
    case "Finance":
      return <GiMoneyStack />;
    case "Excel":
      return <SiMicrosoftexcel />;
    case "External Auditing":
      return <TbZoomMoney />;
    case "Finance Consulting":
      return <MdOutlineControlCamera />;
    case "Financial Accounting":
      return <MdAccountBalance />;
    case "Financial Services Tax":
      return <TbReceiptTax />;
    case "Value Added Tax":
      return <TbOval />;
    case "Corporate Income Tax":
      return <MdCorporateFare />;
    case "Property Tax":
      return <TbBuildingSkyscraper />;
  }
}
