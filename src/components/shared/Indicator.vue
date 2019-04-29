<template>
  <div>
    <div id="indicator" class='loader loaderR'>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Indicator"
    }
</script>

<style lang="scss">
  #indicator {
    display: none;
  }

  $grey: #CCCCCC;
  $blue: #1888CC;

  @keyframes rotate {
    0% {
     transform: rotate(50deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rotate2 {
    0% {
      transform: rotate(50deg);
      border-top-color: $grey;
    }
    50% {
      transform: rotate(180deg);
      border-top-color: $blue;
    }
    100% {
      transform: rotate(360deg);
      border-top-color: $grey;
    }
  }

  @mixin loaderDivMixin {
    border-radius: 50%;
    padding: 8px;
    border: 2px solid transparent;
    animation: rotate linear 3.5s infinite;
  }

  .loader {
    position: fixed;
    width: 150px;
    height: 150px;
    display: block;
    overflow: hidden;
    z-index: 999;
    bottom: 0;
    right: 0;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    div {
      height: 100%;
    }
  }


  .loaderR, .loaderR div {
    @include loaderDivMixin;
    border-radius: 50%;
    padding: 4px;
    animation: rotate2 1.2s infinite linear;
  }

  div:hover {
    animation-play-state: paused;
  }

  .loader, .loader * {
    will-change: transform;
  }
</style>
