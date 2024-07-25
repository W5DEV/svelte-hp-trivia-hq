<script>
  import logoLight from "../lib/images/hp-trivia-logo-red.png";
  import logoDark from "../lib/images/hp-trivia-logo-gold.png";
</script>

<label class="swap swap-rotate">
  <!-- this hidden checkbox controls the state -->
  <input type="checkbox" class="theme-controller" value="hpDark" />

    <!-- Light Mode Logo - #740001 -->
    <img src={logoLight} class="w-56 h-56 swap-off" alt="Light Mode"/>

    <!-- Dark Mode Logo - #D3A625 -->
    <img src={logoDark} class="w-56 h-56 swap-on" alt="Dark Mode"/>

  </label>