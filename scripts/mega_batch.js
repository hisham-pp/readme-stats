const https = require('https');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../src/lib/techConfig.json');
const techsPath = path.join(__dirname, '../src/lib/techs.ts');
const iconsDir = path.join(__dirname, '../public/icons');

const newTechs = [
  // Languages
  { key: 'markdown',      id: '139', name: 'Markdown',       color: '#000000', icon: 'markdown-icon.svg',       slug: 'markdown' },
  { key: 'java',          id: '140', name: 'Java',           color: '#ED8B00', icon: 'java-icon.svg',           slug: 'openjdk' },
  { key: 'c',             id: '141', name: 'C',              color: '#A8B9CC', icon: 'c-icon.svg',              slug: 'c' },
  { key: 'cpp',           id: '142', name: 'C++',            color: '#00599C', icon: 'cpp-icon.svg',            slug: 'cplusplus' },
  { key: 'csharp',        id: '143', name: 'C#',             color: '#239120', icon: 'csharp-icon.svg',         slug: 'csharp' },
  { key: 'fsharp',        id: '144', name: 'F#',             color: '#378BBA', icon: 'fsharp-icon.svg',         slug: 'fsharp' },
  { key: 'rust',          id: '145', name: 'Rust',           color: '#000000', icon: 'rust-icon.svg',           slug: 'rust' },
  { key: 'go',            id: '146', name: 'Go',             color: '#00ADD8', icon: 'go-icon.svg',             slug: 'go' },
  { key: 'kotlin',        id: '147', name: 'Kotlin',         color: '#7F52FF', icon: 'kotlin-icon.svg',         slug: 'kotlin' },
  { key: 'swift',         id: '148', name: 'Swift',          color: '#F05138', icon: 'swift-icon.svg',          slug: 'swift' },
  { key: 'dart',          id: '149', name: 'Dart',           color: '#0175C2', icon: 'dart-icon.svg',           slug: 'dart' },
  { key: 'ruby',          id: '150', name: 'Ruby',           color: '#CC342D', icon: 'ruby-icon.svg',           slug: 'ruby' },
  { key: 'php',           id: '151', name: 'PHP',            color: '#777BB4', icon: 'php-icon.svg',            slug: 'php' },
  { key: 'scala',         id: '152', name: 'Scala',          color: '#DC322F', icon: 'scala-icon.svg',          slug: 'scala' },
  { key: 'r_lang',        id: '153', name: 'R',              color: '#276DC3', icon: 'r-lang-icon.svg',         slug: 'r' },
  { key: 'lua',           id: '154', name: 'Lua',            color: '#2C2D72', icon: 'lua-icon.svg',            slug: 'lua' },
  { key: 'elixir',        id: '155', name: 'Elixir',         color: '#4B275F', icon: 'elixir-icon.svg',         slug: 'elixir' },
  { key: 'haskell',       id: '156', name: 'Haskell',        color: '#5D4F85', icon: 'haskell-icon.svg',        slug: 'haskell' },
  { key: 'perl',          id: '157', name: 'Perl',           color: '#39457E', icon: 'perl-icon.svg',           slug: 'perl' },
  { key: 'julia',         id: '158', name: 'Julia',          color: '#9558B2', icon: 'julia-icon.svg',          slug: 'julia' },
  { key: 'groovy',        id: '159', name: 'Groovy',         color: '#4298B8', icon: 'groovy-icon.svg',         slug: 'apachegroovy' },
  // Mobile
  { key: 'flutter',       id: '160', name: 'Flutter',        color: '#02569B', icon: 'flutter-icon.svg',        slug: 'flutter' },
  { key: 'expo',          id: '161', name: 'Expo',           color: '#000020', icon: 'expo-icon.svg',           slug: 'expo' },
  { key: 'android',       id: '162', name: 'Android',        color: '#3DDC84', icon: 'android-icon.svg',        slug: 'android' },
  { key: 'ios',           id: '163', name: 'iOS',            color: '#000000', icon: 'ios-icon.svg',            slug: 'apple' },
  { key: 'capacitor',     id: '164', name: 'Capacitor',      color: '#119EFF', icon: 'capacitor-icon.svg',      slug: 'capacitor' },
  // Frontend Frameworks
  { key: 'vuejs',         id: '165', name: 'Vue.js',         color: '#4FC08D', icon: 'vuejs-icon.svg',          slug: 'vuedotjs' },
  { key: 'svelte',        id: '166', name: 'Svelte',         color: '#FF3E00', icon: 'svelte-icon.svg',         slug: 'svelte' },
  { key: 'astro',         id: '167', name: 'Astro',          color: '#FF5D01', icon: 'astro-icon.svg',          slug: 'astro' },
  { key: 'remix',         id: '168', name: 'Remix',          color: '#000000', icon: 'remix-icon.svg',          slug: 'remix' },
  { key: 'nuxtjs',        id: '169', name: 'Nuxt.js',        color: '#00DC82', icon: 'nuxtjs-icon.svg',         slug: 'nuxtdotjs' },
  { key: 'gatsby',        id: '170', name: 'Gatsby',         color: '#663399', icon: 'gatsby-icon.svg',         slug: 'gatsby' },
  { key: 'solid',         id: '171', name: 'SolidJS',        color: '#2C4F7C', icon: 'solid-icon.svg',          slug: 'solid' },
  { key: 'three_js',      id: '172', name: 'Three.js',       color: '#000000', icon: 'three-js-icon.svg',       slug: 'threedotjs' },
  { key: 'wasm',          id: '173', name: 'WebAssembly',    color: '#654FF0', icon: 'wasm-icon.svg',           slug: 'webassembly' },
  // Backend Frameworks
  { key: 'fastapi',       id: '174', name: 'FastAPI',        color: '#009688', icon: 'fastapi-icon.svg',        slug: 'fastapi' },
  { key: 'spring_boot',   id: '175', name: 'Spring Boot',    color: '#6DB33F', icon: 'spring-boot-icon.svg',    slug: 'springboot' },
  { key: 'laravel',       id: '176', name: 'Laravel',        color: '#FF2D20', icon: 'laravel-icon.svg',        slug: 'laravel' },
  { key: 'rails',         id: '177', name: 'Ruby on Rails',  color: '#D30001', icon: 'rails-icon.svg',          slug: 'rubyonrails' },
  { key: 'phoenix',       id: '178', name: 'Phoenix',        color: '#FD4F00', icon: 'phoenix-icon.svg',        slug: 'phoenixframework' },
  { key: 'hono',          id: '179', name: 'Hono',           color: '#E36002', icon: 'hono-icon.svg',           slug: 'hono' },
  { key: 'fastify',       id: '180', name: 'Fastify',        color: '#000000', icon: 'fastify-icon.svg',        slug: 'fastify' },
  { key: 'graphql',       id: '181', name: 'GraphQL',        color: '#E10098', icon: 'graphql-icon.svg',        slug: 'graphql' },
  { key: 'trpc',          id: '182', name: 'tRPC',           color: '#2596BE', icon: 'trpc-icon.svg',           slug: 'trpc' },
  // Cloud & DevOps
  { key: 'azure',         id: '183', name: 'Azure',          color: '#0089D6', icon: 'azure-icon.svg',          slug: 'microsoftazure' },
  { key: 'gcp',           id: '184', name: 'Google Cloud',   color: '#4285F4', icon: 'gcp-icon.svg',            slug: 'googlecloud' },
  { key: 'digitalocean',  id: '185', name: 'DigitalOcean',   color: '#0080FF', icon: 'digitalocean-icon.svg',   slug: 'digitalocean' },
  { key: 'heroku',        id: '186', name: 'Heroku',         color: '#430098', icon: 'heroku-icon.svg',         slug: 'heroku' },
  { key: 'netlify',       id: '187', name: 'Netlify',        color: '#00C7B7', icon: 'netlify-icon.svg',        slug: 'netlify' },
  { key: 'cloudflare',    id: '188', name: 'Cloudflare',     color: '#F48120', icon: 'cloudflare-icon.svg',     slug: 'cloudflare' },
  { key: 'railway',       id: '189', name: 'Railway',        color: '#0B0D0E', icon: 'railway-icon.svg',        slug: 'railway' },
  { key: 'kubernetes',    id: '190', name: 'Kubernetes',     color: '#326CE5', icon: 'kubernetes-icon.svg',     slug: 'kubernetes' },
  { key: 'jenkins',       id: '191', name: 'Jenkins',        color: '#D24939', icon: 'jenkins-icon.svg',        slug: 'jenkins' },
  { key: 'circle_ci',     id: '192', name: 'CircleCI',       color: '#343434', icon: 'circle-ci-icon.svg',      slug: 'circleci' },
  { key: 'ansible',       id: '193', name: 'Ansible',        color: '#EE0000', icon: 'ansible-icon.svg',        slug: 'ansible' },
  { key: 'nginx',         id: '194', name: 'nginx',          color: '#009639', icon: 'nginx-icon.svg',          slug: 'nginx' },
  // Databases
  { key: 'redis',         id: '195', name: 'Redis',          color: '#DC382D', icon: 'redis-icon.svg',          slug: 'redis' },
  { key: 'mysql',         id: '196', name: 'MySQL',          color: '#4479A1', icon: 'mysql-icon.svg',          slug: 'mysql' },
  { key: 'mariadb',       id: '197', name: 'MariaDB',        color: '#003545', icon: 'mariadb-icon.svg',        slug: 'mariadb' },
  { key: 'firebase',      id: '198', name: 'Firebase',       color: '#FFCA28', icon: 'firebase-icon.svg',       slug: 'firebase' },
  { key: 'elasticsearch', id: '199', name: 'Elasticsearch',  color: '#005571', icon: 'elasticsearch-icon.svg',  slug: 'elasticsearch' },
  { key: 'neo4j',         id: '200', name: 'Neo4j',          color: '#008CC1', icon: 'neo4j-icon.svg',          slug: 'neo4j' },
  { key: 'cassandra',     id: '201', name: 'Cassandra',      color: '#1287B1', icon: 'cassandra-icon.svg',      slug: 'apachecassandra' },
  { key: 'influxdb',      id: '202', name: 'InfluxDB',       color: '#22ADF6', icon: 'influxdb-icon.svg',       slug: 'influxdb' },
  { key: 'mssql',         id: '203', name: 'MS SQL Server',  color: '#CC2927', icon: 'mssql-icon.svg',          slug: 'microsoftsqlserver' },
  { key: 's3',            id: '204', name: 'Amazon S3',      color: '#569A31', icon: 's3-icon.svg',             slug: 'amazons3' },
  // Messaging
  { key: 'kafka',         id: '205', name: 'Apache Kafka',   color: '#231F20', icon: 'kafka-icon.svg',          slug: 'apachekafka' },
  { key: 'rabbitmq',      id: '206', name: 'RabbitMQ',       color: '#FF6600', icon: 'rabbitmq-icon.svg',       slug: 'rabbitmq' },
  { key: 'mqtt',          id: '207', name: 'MQTT',           color: '#660066', icon: 'mqtt-icon.svg',           slug: 'mqtt' },
  // Testing
  { key: 'cypress',       id: '208', name: 'Cypress',        color: '#17202C', icon: 'cypress-icon.svg',        slug: 'cypress' },
  { key: 'playwright',    id: '209', name: 'Playwright',     color: '#2EAD33', icon: 'playwright-icon.svg',     slug: 'playwright' },
  { key: 'selenium',      id: '210', name: 'Selenium',       color: '#43B02A', icon: 'selenium-icon.svg',       slug: 'selenium' },
  { key: 'mocha',         id: '211', name: 'Mocha',          color: '#8D6748', icon: 'mocha-icon.svg',          slug: 'mocha' },
  { key: 'puppeteer',     id: '212', name: 'Puppeteer',      color: '#40B5A4', icon: 'puppeteer-icon.svg',      slug: 'puppeteer' },
  { key: 'k6',            id: '213', name: 'k6',             color: '#7D64FF', icon: 'k6-icon.svg',             slug: 'k6' },
  { key: 'storybook',     id: '214', name: 'Storybook',      color: '#FF4785', icon: 'storybook-icon.svg',      slug: 'storybook' },
  // AI / ML
  { key: 'tensorflow',    id: '215', name: 'TensorFlow',     color: '#FF6F00', icon: 'tensorflow-icon.svg',     slug: 'tensorflow' },
  { key: 'pytorch',       id: '216', name: 'PyTorch',        color: '#EE4C2C', icon: 'pytorch-icon.svg',        slug: 'pytorch' },
  { key: 'langchain',     id: '217', name: 'LangChain',      color: '#1C3C3C', icon: 'langchain-icon.svg',      slug: 'langchain' },
  { key: 'openai_sdk',    id: '218', name: 'OpenAI SDK',     color: '#412991', icon: 'openai-sdk-icon.svg',     slug: 'openai' },
  { key: 'hugging_face',  id: '219', name: 'Hugging Face',   color: '#FFD21E', icon: 'hugging-face-icon.svg',   slug: 'huggingface' },
  { key: 'pandas',        id: '220', name: 'Pandas',         color: '#150458', icon: 'pandas-icon.svg',         slug: 'pandas' },
  { key: 'numpy',         id: '221', name: 'NumPy',          color: '#013243', icon: 'numpy-icon.svg',          slug: 'numpy' },
  { key: 'scikit_learn',  id: '222', name: 'Scikit-learn',   color: '#F7931E', icon: 'scikit-learn-icon.svg',   slug: 'scikitlearn' },
  { key: 'ollama',        id: '223', name: 'Ollama',         color: '#000000', icon: 'ollama-icon.svg',         slug: 'ollama' },
  // Build Tools
  { key: 'webpack',       id: '224', name: 'Webpack',        color: '#8DD6F9', icon: 'webpack-icon.svg',        slug: 'webpack' },
  { key: 'vite',          id: '225', name: 'Vite',           color: '#646CFF', icon: 'vite-icon.svg',           slug: 'vite' },
  { key: 'rollup',        id: '226', name: 'Rollup',         color: '#EC4A3F', icon: 'rollup-icon.svg',         slug: 'rollupdotjs' },
  { key: 'esbuild',       id: '227', name: 'esbuild',        color: '#FFCF00', icon: 'esbuild-icon.svg',        slug: 'esbuild' },
  { key: 'babel',         id: '228', name: 'Babel',          color: '#F9DC3E', icon: 'babel-icon.svg',          slug: 'babel' },
  { key: 'turborepo',     id: '229', name: 'Turborepo',      color: '#EF4444', icon: 'turborepo-icon.svg',      slug: 'turborepo' },
  { key: 'nx',            id: '230', name: 'Nx',             color: '#143055', icon: 'nx-icon.svg',             slug: 'nx' },
  // Design
  { key: 'figma',         id: '231', name: 'Figma',          color: '#F24E1E', icon: 'figma-icon.svg',          slug: 'figma' },
  { key: 'framer',        id: '232', name: 'Framer',         color: '#0055FF', icon: 'framer-icon.svg',         slug: 'framer' },
  // Auth
  { key: 'auth0',         id: '233', name: 'Auth0',          color: '#EB5424', icon: 'auth0-icon.svg',          slug: 'auth0' },
  { key: 'clerk',         id: '234', name: 'Clerk',          color: '#6C47FF', icon: 'clerk-icon.svg',          slug: 'clerk' },
  { key: 'keycloak',      id: '235', name: 'Keycloak',       color: '#4D4D4D', icon: 'keycloak-icon.svg',       slug: 'keycloak' },
  { key: 'jwt',           id: '236', name: 'JWT',            color: '#000000', icon: 'jwt-icon.svg',            slug: 'jsonwebtokens' },
  // Runtimes & Package Managers
  { key: 'deno',          id: '237', name: 'Deno',           color: '#000000', icon: 'deno-icon.svg',           slug: 'deno' },
  { key: 'yarn',          id: '238', name: 'Yarn',           color: '#2C8EBB', icon: 'yarn-icon.svg',           slug: 'yarn' },
  { key: 'pip',           id: '239', name: 'pip',            color: '#3775A9', icon: 'pip-icon.svg',            slug: 'pypi' },
  { key: 'maven',         id: '240', name: 'Maven',          color: '#C71A36', icon: 'maven-icon.svg',          slug: 'apachemaven' },
  { key: 'gradle',        id: '241', name: 'Gradle',         color: '#02303A', icon: 'gradle-icon.svg',         slug: 'gradle' },
  { key: 'composer',      id: '242', name: 'Composer',       color: '#885630', icon: 'composer-icon.svg',       slug: 'composer' },
  // IDEs & Tools
  { key: 'intellij',      id: '243', name: 'IntelliJ IDEA',  color: '#000000', icon: 'intellij-icon.svg',       slug: 'intellijidea' },
  { key: 'webstorm',      id: '244', name: 'WebStorm',       color: '#000000', icon: 'webstorm-icon.svg',       slug: 'webstorm' },
  { key: 'xcode',         id: '245', name: 'Xcode',          color: '#147EFB', icon: 'xcode-icon.svg',          slug: 'xcode' },
  { key: 'android_studio',id: '246', name: 'Android Studio', color: '#3DDC84', icon: 'android-studio-icon.svg', slug: 'androidstudio' },
  { key: 'vim',           id: '247', name: 'Vim',            color: '#019733', icon: 'vim-icon.svg',            slug: 'vim' },
  { key: 'neovim',        id: '248', name: 'Neovim',         color: '#57A143', icon: 'neovim-icon.svg',         slug: 'neovim' },
  { key: 'insomnia',      id: '249', name: 'Insomnia',       color: '#4000BF', icon: 'insomnia-icon.svg',       slug: 'insomnia' },
  { key: 'dbeaver',       id: '250', name: 'DBeaver',        color: '#382923', icon: 'dbeaver-icon.svg',        slug: 'dbeaver' },
];

const genericSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4zm-4.1 1.8l1.9.4 2.2-9.6-1.9-.4-2.2 9.6z"/></svg>`;

function downloadIcon(slug) {
  return new Promise((resolve) => {
    const url = `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${slug}.svg`;
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => resolve(data));
      } else resolve(null);
    }).on('error', () => resolve(null));
  });
}

async function main() {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  for (const tech of newTechs) {
    // Add to config
    config[tech.key] = {
      name: tech.name,
      color: tech.color,
      iconPosition: 'left',
      icon: tech.icon,
      showText: true,
      id: `${tech.id}_${tech.key}`
    };

    // Download icon
    const iconPath = path.join(iconsDir, tech.icon);
    if (!fs.existsSync(iconPath)) {
      const svg = await downloadIcon(tech.slug);
      if (svg) {
        fs.writeFileSync(iconPath, svg);
        console.log(`✅ ${tech.key} → simple-icons/${tech.slug}`);
      } else {
        fs.writeFileSync(iconPath, genericSvg);
        console.log(`🎨 ${tech.key} → generic SVG (${tech.slug} not found)`);
      }
    } else {
      console.log(`⏭️  ${tech.key} icon already exists`);
    }
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`\n✅ Updated techConfig.json with ${newTechs.length} new technologies.`);

  // Update techs.ts
  let techsContent = fs.readFileSync(techsPath, 'utf8');
  const newMappings = newTechs.map(t => `  ${t.key}: "${t.id}_${t.key}.svg",`).join('\n');
  techsContent = techsContent.replace('};', `${newMappings}\n};`);
  fs.writeFileSync(techsPath, techsContent);
  console.log(`✅ Updated techs.ts with ${newTechs.length} new mappings.`);
}

main();
