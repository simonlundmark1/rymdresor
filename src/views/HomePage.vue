<template>
  <Banner />
  <div class="home-hero">
    <Navbar @search="handleSearch" />

    <h1 class="hero-title">Det var bättre förr.™  </h1>
    <SearchTrip/>
    <div class="clock-sak">
      <Clock />
    </div>
  </div>
  <div class="hero-img">
    <img src="/public/heade2.png" alt="Hero Image" />
  </div>
  <div class="twintowers">
    <img src="/public/twintowers.png" alt="Twin Towers" />
  </div>
  <div class="flygplan">
    <img src="/public/flygplan.png" alt="Flygplan" />
  </div>
  <div v-if="explosionVisible" class="explosion">
    <img src="/public/explode.gif" alt="Explosion" />
  </div>
  <div class="techno">
    <img src="/public/technoviking.png" alt="Hero Image" />
  </div>
  <div class="jesus">
    <img src="/public/jesus2.png" alt="Hero Image" />
  </div>
  <space-experience-list :experiences="experiences" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SpaceExperienceList from "../components/SpaceExperienceList.vue";
import Navbar from "../components/Navbar.vue";
import Banner from "../components/Banner.vue";
import Clock from "../components/Clock.vue";
import SearchTrip from "../components/SearchTrip.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    SpaceExperienceList,
    Navbar,
    Banner,
    Clock,
    SearchTrip,
  },
  data() {
    return {
      searchQuery: "",
      experiences: [] as any[],
      explosionVisible: false,
      explosionTimeoutId: null as number | null, // To store the timeout ID
      explosionIntervalId: null as number | null, // To store the interval ID
    };
  },
  methods: {
    handleSearch(query: string) {
      this.searchQuery = query;
      this.searchForExperience(query);
    },

    searchForExperience(query: string) {
      const searchQuery = query.trim().toLowerCase();
      const matchingExperience = this.experiences.find((experience) =>
        experience.title.trim().toLowerCase().includes(searchQuery)
      );
      if (matchingExperience) {
        const index = this.experiences.indexOf(matchingExperience);
        const element = document.querySelector(
          `[data-ref="experience-${index}"]`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        console.warn("No matching experience found.");
      }
    },

    triggerExplosion() {
      console.log("Explosion triggered!");
      this.explosionVisible = true;
      // Hide the explosion after 1 second
      this.explosionTimeoutId = window.setTimeout(() => {
        console.log("Explosion hidden!");
        this.explosionVisible = false;
        this.explosionTimeoutId = null;
      }, 950); // 1 second
    },

    startFlygplanAnimation() {
      // Animation duration is 5s, need to trigger at 2.5s
      // Set initial timeout to trigger at 2.5s
      this.explosionTimeoutId = window.setTimeout(() => {
        this.triggerExplosion();
        // After the initial trigger, set an interval to trigger every 5s
        this.explosionIntervalId = window.setInterval(() => {
          this.triggerExplosion();
        }, 5000); // 5 seconds
      }, 2500); // 2.5 seconds
    },
  },

  async created() {
    try {
      const res = await fetch("/src/data/data.json");
      const data = await res.json();
      this.experiences = data.experiences;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    this.startFlygplanAnimation();
  },

  beforeUnmount() {
    // Clean up the timeouts and intervals to prevent memory leaks
    if (this.explosionTimeoutId !== null) {
      clearTimeout(this.explosionTimeoutId);
    }
    if (this.explosionIntervalId !== null) {
      clearInterval(this.explosionIntervalId);
    }
  },
});
</script>

<style scoped>

.home-hero{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.clock-sak {
  opacity: 0.3;
  position: relative;
  margin-left: -12rem;
  margin-top: -1.5rem;
  zoom: 400%; /* Preserved as per original */
  z-index: 1;
  animation: slideUp 1s ease-in-out;
}


.jesus {
  position: absolute;
  margin-top: -27rem;
  margin-left: 38rem;
  z-index: 1;
  overflow: hidden;
  zoom: 150%;
  opacity: 0.6;
  animation: jesus 7s ease-in-out;

}



.techno {
  position: absolute;
  margin-top: -35rem;
  margin-left: 0rem;
  z-index: 0;
  overflow: hidden;
  zoom: 150%;
  opacity: 0.5;
  animation: slideUp 1s ease-in-out;

}


.twintowers {
  position: absolute;
  margin-top: -45rem;
  margin-left: 95rem;
  z-index: 2;
  overflow: hidden;
}

.twintowers img {
  width: 100%;
  height: 100%;
  z-index: 2;
}

@keyframes flygplanAnimation {
  0% {
    margin-left: -38rem;
    margin-top: -27rem;
    opacity: 1;
  }
  50% {
    margin-left: 90rem;
    margin-top: -42rem;
    opacity: 1;
  }
  50.1% {
    opacity: 0;
  }
  60% {
    margin-left: 77rem;
    margin-top: -45rem;

    opacity:0;
  }
  80%{
    opacity: 0.0
  }
  99% {
    opacity: 0.0;
  }
  100% {
    margin-left: -38rem;
    margin-top: -30rem;
    opacity: 1;
  }
}

.flygplan {
  position: absolute;
  margin-top: -50rem;
  margin-left: -38rem; /* Initial position matching 0% keyframe */
  z-index: 3;
  overflow: hidden;
  animation: flygplanAnimation 5s cubic-bezier(0.42, 0, 1.0, 1.0) infinite;
}

.flygplan img {
  zoom: 20%; /* Preserved as per original */
}

.hero-img {
  position: relative;
  margin-top: -30rem;
  margin-left: -35rem;
  overflow: hidden;
  z-index: 999;
}

.home-hero {
  background: linear-gradient(to bottom, #f6a8a3, #DEF2F6);
  background-size: cover;
  height: 100vh;
  position: relative;
}

.section-1 {
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-title {
  position: relative;
  z-index: 999999999999;
  margin-top: 2%;
  font-size: 90px;
  animation: fadeIn 3s ease-in-out, slideUp 5s ease-in-out;
  text-align: center;
  color: #0F4446;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 40px;
  }
}

.explosion {
  position: absolute;
  top: 60%;
  left: 86%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.explosion img{
zoom: 200%
}

@keyframes jesus {
  from {
    transform: translateY(15rem);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}
</style>

