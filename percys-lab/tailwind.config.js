/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage:{
        'EvilPercy': "url('https://cdn.discordapp.com/attachments/375560558277296140/1161908487522091129/collection.jpg?ex=653a029a&is=65278d9a&hm=25ac6db8d49aad0a7dc55ff8d050a9279972d207a70fba01678888934f70b9bb&')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

