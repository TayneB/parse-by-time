const characterData = `
    query {
      characterData {
        character(name: "Marbin", serverSlug: "frostmourne", serverRegion: "us") {
          id
          name
          level
        }
      }
    }
  `

export { characterData }
