<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">La Ferroviaria</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        >
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'clientes' }"
              >Clientes</router-link
            >
          </li>
          <li class="nav-item">
         <router-link class="nav-link" :to="{ name: 'producto' }"
              >Productos</router-link
            >
          </li>
             <li class="nav-item">
         <router-link class="nav-link" :to="{ name: 'factura' }"
              >Facturación</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
