export interface TechGroup {
  title: string;
  keys: string[];
}

export const techGroups: TechGroup[] = [
  {
    title: "Frontend",
    keys: "react,nextjs,angular,typescript,javascript,html5,css3,tailwindcss,mui,chakra,radix_ui,redux,redux_saga,zustand,react_hook_form,rtk_query,react_query,react_select,react_datepicker,apexcharts,vuejs,nuxtjs,three_js".split(",")
  },
  {
    title: "UI Tools",
    keys: "vitest,axios,lodash,next_auth,zod,yup,dayjs,date_fns,i18next,jspdf,react_quill,react_toastify,stylis_plugin_rtl,react_dropzone,monaco_editor,react_easy_crop,google_libphonenumber,dnd_kit,emotion_react,graphql".split(",")
  },
  {
    title: "Backend",
    keys: "nodejs,nestjs,python,django,flask,fastapi,fastify,rest_api,api_integration,webhooks,serverless,aws_lambda,soap,azure_functions,bcryptjs,express,passport,rxjs,jest,boto3,opentelemetry,bullmq,exceljs,pdfkit,pdfmake,xlsx,uuid,sanitize_html,multer,mongoose".split(",")
  },
  {
    title: "Databases",
    keys: "postgresql,mongodb,sqlite,dynamodb,supabase,prisma,typeorm,drizzle_orm,redis,mysql,firebase,mssql,s3,db".split(",")
  },
  {
    title: "Cloud & DevOps",
    keys: "gcp,vercel,netlify,cloudflare,railway,kubernetes,ansible,nginx,rabbitmq".split(",")
  },
  {
    title: "Tools & Development",
    keys: "git,github,gitlab,vscode,cursor,windsurf,kiro,claude_code,claude_desktop,codex,devin,gemini,gemini_cli,claude,chatgpt,ai_studio,antigravity,antigravity_cli,pnpm,npm,sonarqube,postman,linux,windows,wsl,eslint,prettier,lefthook,husky,figma,vim,neovim,dbeaver,storybook".split(",")
  },
  {
    title: "Build Tools, Auth & Package Managers",
    keys: "vite,webpack,esbuild,babel,turborepo,nx,yarn,pip,venv,auth0,jwt,expo".split(",")
  },
  {
    title: "AI & ML",
    keys: "pytorch,numpy,pandas,openai_sdk,v0".split(",")
  },
  {
    title: "Testing",
    keys: "playwright,puppeteer".split(",")
  },
  {
    title: "Languages & Scripting",
    keys: "javascript,typescript,python,html5,css3,sql,json,yaml,xml,terraform,bash,zsh,powershell,markdown,c,cpp".split(",")
  }
];
