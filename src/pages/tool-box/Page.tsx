import AiCompanion from "@/components/ToolBox/AiCompanion";
import GenricTool from "@/components/ToolBox/GenricTool";
import MyApps from "@/components/ToolBox/MyApps";
import MyLibrary from "@/components/ToolBox/MyLibrary";


const ToolBoxPage = () => {

  return (
    <div className="w-full h-full ">
        <AiCompanion />
        <hr className="my-4"/>
        <GenricTool/>
        <hr className="my-4"/>
        <div className="flex flex-col md:flex-row space-x-4  mb-4">
        <MyApps/>
        <div className="w-[4px] bg-[#E4E4E4] self-stretch"></div>
        <MyLibrary/>
        </div>
     </div>
  );
};

export default ToolBoxPage;
