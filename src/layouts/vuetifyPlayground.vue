<template>
  <Navbar></Navbar>
  <aside>
    <components-navigation></components-navigation>
  </aside>
  <main role="main" aria-labelledby="main-title" class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <h1> Vuetify </h1>
    <section aria-labelledby="section-title">
      <h2> componentes Vuetify </h2>
      <RouterView />
    </section>
    <div class="mt-5 mx-auto text-center opacity-75 dark:opacity-50 text-sm">
      [Vuetify Layout]
    </div>
  </main>
</template>
