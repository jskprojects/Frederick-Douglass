import './App.css';
import { useRef, Suspense, useEffect, useState, useMemo } from 'react';
import * as THREE from "three"
import { Mesh } from 'three';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Text, Sphere, Line, Sparkles, Stars, useHelper, useProgress, Html, Loader } from "@react-three/drei";

const DehumanizationSlide = ({ delta, mode }) => {
  var rot = -((delta-2.5) * 0.25 * Math.PI)
  var titleRef = useRef()
  var groupRef = useRef()
  var hovered = useRef(0)
  var selected = useRef(0)

  var texts = [
    "The theme of dehumanization is one of the most prominent components of the Narrative of the Life of Frederick Douglass. Throughout his novel, Douglass repeatedly portrays this theme through various lenses, including slaves’ restriction to education, brutal treatment, objectification, separation from family, deprivation of possessions, and lack of legal acknowledgement. For instance, slaveholders intentionally prevent slaves from gaining access to education. By keeping slaves illiterate and ignorant, the slaveholders carelessly strip away the intellectual capacity of slaves to maintain absolute power over them. Douglass uses this to elaborate this theme of dehumanization, addressing how slaveholders thieved the basic human right of freedom by halting the education of slaves. Additionally, Douglass depicts this theme through the brutal treatment slaves received. He details the harsh physical abuse slaves were forced to endure, including several of his own experiences, explaining how slaveholders ignored the intrinsic humanities of not only slaves, but even free black individuals. The objectification of slaves is another instance of dehumanization. Slaves were treated as property and personal belongings, with Douglass even recounting occurrences of slaves being sold to southern slave traders. They were divested of all natural rights, including the right to own property. Slaves had few personal belongings, often none, acting as another example of their cruel dehumanization. In addition to their personal belongings, slaves were also deprived of their families. Douglass mentioned how he was separated from his mother at birth, a common occurrence for slaves at that time. Nearly every slave was taken from their family and denied the opportunity to connect with them, leaving a hole that essential social bonds would normally fill. Finally, slaves were completely denied all legal recognition or protection. They were never considered individuals, but rather property subject to the will of their owners. Douglass elaborated upon several instances where slaves were brutally murdered without any legal action taken, displaying how slaves were viewed as valueless.",
    "   EX #1:\nPages 1-2: “It is a common custom, in the part of Maryland from which I ran away, to part children from their mothers at a very early age. Frequently, before the child has reached its twelfth month, its mother is taken from it, and hired out on some farm a considerable distance off, and the child is placed under the care of an old woman, too old for field labor. For what this separation is done, I do not know, unless it be to hinder the development of the child’s affection toward its mother, and to blunt and destroy the natural affection of the mother for the child.“\nDouglass explains how children of slaves were separated from their parents at birth, a deliberate attempt at keeping the child ignorant and mindless. He uses this as a poignant representation of the dehumanization in slavery, as slaveholders attempt to thieve one of the fundamental components of a slave’s humanity: social bonds.",
    "   EX #2:\nPage 27: “We were all ranked together at the valuation. Men and women, old and young, married and single, were ranked with horses, sheep, and swine. There were horses and men, cattle and women, pigs and children, all holding the same rank in the scale of being, and were all subjected to the same narrow examination. Silvery-headed age and sprightly youth, maids and matrons, had to undergo the same indelicate inspection.”\nIn this quote, Douglass highlights the dehumanizing practice where the value of slaves was reduced to that of animals, being evaluated and given away as property. Regardless of their age, sex, relationships, or conditions, they were all separated and distributed, degrading their psyche and stripping it of worth."
  ]
  
  if (groupRef.current != null && titleRef.current != null) {
    groupRef.current.position.set(0.07, 3.925, 0.375)
    if (mode !== -1) groupRef.current.rotation.set(0, rot, 0)
    titleRef.current.position.set(0, 0, 0.2)
  }

  var lineOpacity = delta < 2 ? Math.min(0.75, delta-1) : 0.75-((delta/2)-1)
  var instructionOpacity = delta < 2 ? Math.min(1, delta-1) : 1-((delta/2)-1)

  return (
    <>
      <group ref={groupRef}>
        <Text
          scale={0.1}
          ref={titleRef}
          font='Poppins-Medium.ttf'
          color={"black"}
          textAlign='center'
          curveRadius={-2}
          lineHeight={1.25}
          fillOpacity={mode === -1 ? 0 : Math.min(1, delta-0.5)}
          outlineOpacity={mode === -1 ? 0 : Math.min(1, delta-0.5)}
          outlineColor={"white"}
          outlineWidth={0.05}
          anchorX={"center"}
          anchorY={"middle"}
        >
          Dehumanization
        </Text>
      </group>
      <Text
        position={[0.55, 4.2, 0.2]}
        rotation={[0, -45 * Math.PI/180, 0]}
        scale={selected.current === 0 ? 0.05 : 0.075}
        font='Poppins-Medium.ttf'
        color={"black"}
        textAlign='left'
        lineHeight={1.25}
        fillOpacity={mode === -1 ? (1-delta*5) : Math.min(1, delta-1)}
        outlineOpacity={mode === -1 ? (1-delta*5) : Math.min(1, delta-1)}
        outlineColor={"white"}
        maxWidth={selected.current === 0 ? 60 : 40}
        outlineWidth={0.05}
        anchorX={"left"}
        anchorY={"top"}                                                           //| <- line cutoff here
      >
        {texts[selected.current]}
      </Text>
      <Sphere position={[0.255, 3.37, 0.49]} args={[0.015, 16, 8]} opacity={Math.max(delta*5)}
        onPointerOver={() => hovered.current = 0 } 
        onPointerOut={() => hovered.current = -1 }
        onClick={() => selected.current = 0 }
      >
        <meshBasicMaterial
          attach="material"
          opacity={1}
          color={selected.current === 0 ? 0x55c8ff : hovered.current === 0 ? 0x1195ff : 0xffffff}
          transparent={true}
          
        />
      </Sphere>
      <Sphere position={[0.267, 3.263, 0.488]} args={[0.015, 16, 8]} opacity={Math.max(delta*5)}
        onPointerOver={() => hovered.current = 1 } 
        onPointerOut={() => hovered.current = -1 }
        onClick={() => selected.current = 1 }
      >
        <meshBasicMaterial
          attach="material"
          opacity={1}
          color={selected.current === 1 ? 0x55c8ff : hovered.current === 1 ? 0x1195ff : 0xffffff}
          transparent={true}
        />
      </Sphere>
      <Sphere position={[0.289, 3.165, 0.48]} args={[0.015, 16, 8]} opacity={Math.max(delta*5)}
        onPointerOver={() => hovered.current = 2 } 
        onPointerOut={() => hovered.current = -1 }
        onClick={() => selected.current = 2 }
      >
        <meshBasicMaterial
          attach="material"
          opacity={1}
          color={selected.current === 2 ? 0x55c8ff : hovered.current === 2 ? 0x1195ff : 0xffffff}
          transparent={true}
        />
      </Sphere>
      <Line
        points={[[0.255, 3.37, 0.49], [0.15, 3.26, 0.65]]}
        color={"white"}
        lineWidth={4}
        opacity={lineOpacity}
        transparent={true}
      />
      <Line
        points={[[0.267, 3.263, 0.488], [0.15, 3.26, 0.65]]}
        color={"white"}
        lineWidth={4}
        opacity={lineOpacity}
        transparent={true}
      />
      <Line
        points={[[0.289, 3.165, 0.48], [0.15, 3.26, 0.65]]}
        color={"white"}
        lineWidth={4}
        opacity={lineOpacity}
        transparent={true}
      />
      <Text
        position={[0.11, 3.26, 0.65]}
        rotation={[0, 0, 0]}
        scale={0.03}
        font='Poppins-Medium.ttf'
        color={"white"}
        textAlign='center'
        lineHeight={1.25}
        fillOpacity={instructionOpacity}
        anchorX={"center"}
        anchorY={"middle"}
      >
        Click{"\n"}Here
      </Text>
    </>
  )
}

const PowerOfEducationSlide = ({ delta, mode }) => {
  var hovered = useRef(-1)
  var selected = useRef(0)

  var titles = [
    "The Power of Education",
    "Example #1",
    "Example #2"
  ]

  var texts = [
    "The power of knowledge and education is another crucial theme presented in Frederick Douglass’s novel. Ultimately, Douglass’s education was at the core of his pursuit for freedom, and he would likely never have been able to attain it without improving his intellect. He began his educational journey with his master’s wife teaching him to read, where he learned the very reason his journey had not started earlier: slaveholders intentionally prevented slaves from receiving education as a means to control them. This sparked something inside of Douglass, and led him to realize the importance and power of education. He continued to learn even after his master’s wife stopped teaching him, allowing him to empower himself by opening his mind and learning new ideas and perspectives. His newfound level of comprehension allowed him to fully understand the impurity of slavery, and he began to envision a life outside of its confines. He began to fight back against his masters and overseers, despite knowing the consequences. Education opened his eyes to the idea that he could easily overpower them, providing him with power he would never have even been able to fathom without starting his educational journey. Additionally, his education acted as a bridge between his condition and the rest of the world. Although he was not able to immediately escape physically, he sometimes could mentally. His yearn for a life of liberty solely drove him daily, keeping him motivated and preventing him from giving up and taking his life. His future work with abolition exposed his presence to the world, inevitably providing him with a power beyond all others: a place in history.",
    "Page 20: “These words sank deep into my heart, stirred up sentiments within that lay slumbering, and called into existence an entirely new train of thought. It was a new and special revelation, explaining dark and mysterious things, with which my youthful understanding had struggled, but struggled in vain. I now understood what had been to me a most perplexing difficulty—to wit, the white man’s power to enslave the black man. It was a grand achievement, and I prized it highly. From that moment, I understood the pathway from slavery to freedom.”\nIn this quote, Douglass is discussing the instruction his master gave to his wife: do not teach Douglass how to read, as he will become unmanageable and valueless. Douglass suddenly gained an understanding of the power education would provide him, acting as a direct path to freedom. He realized the sheer power intellect would provide him with, allowing him to resist the control of slaveholders, blatantly displaying the power of education and knowledge.",
    "Page 24: “The silver trump of freedom had roused my soul to eternal wakefulness. Freedom now appeared, to disappear no more forever. It was heard in every sound, and seen in every thing. It was ever present to torment me with a sense of my wretched condition. I saw nothing without seeing it, I heard nothing without hearing it, and felt nothing without feeling it. It looked from every star, it smiled in every calm, breathed in every wind, and moved in every storm.”\nDouglass expresses his gaining of knowledge and his education as the “silver trump of freedom”, believing it to have opened his eyes to the idea and keeps him constantly driven towards it. Although he expresses a regret for the position education put him in, he simultaneously expresses the power and clarity of thought it gave him. He yearns for the blissful ignorance his fellow slaves have, as his education has provided him with power and intellect, but not yet the capability to utilize it."
  ]

  var lineOpacity = delta < 2 ? Math.min(0.75, delta-1) : 0.75-((delta/2)-1)
  var instructionOpacity = delta < 2 ? Math.min(1, delta-1) : 1-((delta/2)-1)

  return (
    <>
      <Text
        position={[0.3, 4.27, 2]}
        rotation={[10 * Math.PI/180, 0.66*Math.PI, 0]}
        scale={0.2}
        font='Poppins-Medium.ttf'
        color={"black"}
        textAlign='center'
        lineHeight={1.25}
        fillOpacity={mode === -1 ? (1-delta*4) : Math.min(1, delta-0.5)}
        outlineOpacity={mode === -1 ? (1-delta*4) : Math.min(1, delta-0.5)}
        outlineColor={"white"}
        outlineWidth={0.05}
        anchorX={"center"}
        anchorY={"middle"}
      >
        {titles[selected.current]}
      </Text>
      <Text
        position={[1, 3.9, 3.2]}
        rotation={[10 * Math.PI/180, 0.66*Math.PI, 0]}
        scale={selected.current === 0 ? 0.0524 : 0.065}
        font='Poppins-Medium.ttf'
        color={"black"}
        textAlign='left'
        maxWidth={selected.current === 0 ? 55 : 45}
        lineHeight={1.25}
        fillOpacity={mode === -1 ? (1-delta*4) : Math.min(1, delta-0.5)}
        outlineOpacity={mode === -1 ? (1-delta*4) : Math.min(1, delta-0.5)}
        outlineColor={"white"}
        outlineWidth={0.05}
        anchorX={"left"}
        anchorY={"top"}
      >
        {texts[selected.current]}
      </Text>
      <Sphere position={[0.255, 3.37, 0.49]} args={[0.015, 16, 8]} opacity={Math.max(delta*5)}
        onPointerOver={() => hovered.current = 0 } 
        onPointerOut={() => hovered.current = -1 }
        onClick={() => selected.current = 0 }
      >
        <meshBasicMaterial
          attach="material"
          opacity={1}
          color={selected.current === 0 ? 0x55c8ff : hovered.current === 0 ? 0x1195ff : 0xffffff}
          transparent={true}
          
        />
      </Sphere>
      <Sphere position={[0.267, 3.263, 0.488]} args={[0.015, 16, 8]} opacity={Math.max(delta*5)}
        onPointerOver={() => hovered.current = 1 } 
        onPointerOut={() => hovered.current = -1 }
        onClick={() => selected.current = 1 }
      >
        <meshBasicMaterial
          attach="material"
          opacity={1}
          color={selected.current === 1 ? 0x55c8ff : hovered.current === 1 ? 0x1195ff : 0xffffff}
          transparent={true}
        />
      </Sphere>
      <Sphere position={[0.289, 3.165, 0.48]} args={[0.015, 16, 8]} opacity={Math.max(delta*5)}
        onPointerOver={() => hovered.current = 2 } 
        onPointerOut={() => hovered.current = -1 }
        onClick={() => selected.current = 2 }
      >
        <meshBasicMaterial
          attach="material"
          opacity={1}
          color={selected.current === 2 ? 0x55c8ff : hovered.current === 2 ? 0x1195ff : 0xffffff}
          transparent={true}
        />
      </Sphere>
      <Line
        points={[[0.255, 3.37, 0.49], [0.27, 3.26, 0.6]]}
        color={"white"}
        lineWidth={4}
        opacity={lineOpacity}
        transparent={true}
      />
      <Line
        points={[[0.267, 3.263, 0.488], [0.27, 3.26, 0.6]]}
        color={"white"}
        lineWidth={4}
        opacity={lineOpacity}
        transparent={true}
      />
      <Line
        points={[[0.289, 3.165, 0.48], [0.27, 3.26, 0.6]]}
        color={"white"}
        lineWidth={4}
        opacity={lineOpacity}
        transparent={true}
      />
      <Text
        position={[0.27, 3.25, 0.64]}
        rotation={[10 * Math.PI/180, 0.66*Math.PI, 0]}
        scale={0.03}
        font='Poppins-Medium.ttf'
        color={"white"}
        textAlign='center'
        lineHeight={1.25}
        fillOpacity={instructionOpacity}
        anchorX={"center"}
        anchorY={"middle"}
      >
        Click{"\n"}Here
      </Text>
    </>
  )
}

const ConsequencesSlide = ({ delta, mode }) => {
  var hovered = useRef(-1)
  var selected = useRef(0)

  var titles = [
    "Consequences of Harming Others",
    "Example #1",
    "Example #2"
  ]

  var texts = [
    "The third most prominent theme in Frederick Douglass’s novel is the consequences of harming others. Douglass endeavors to not only illustrate the physical and emotional damage slavery brutally inflicts to the enslaved, but also the psychological toll it imposes on the enslaver. He continuously elucidates the corruption that spreads to those exposed to slavery, slowly eroding their morality as they succumb to the power it can provide them. He recounts several occasions where slaveholders or overseers, such as Mr. Covey, subjected slaves to adultery and other abusive treatments that display a loss of morality. Not only is this consequential for the slaveholder’s wife, who feels indignant from her husband’s perversion, but also for the slaveholder himself. He, lost to the temptations of slavery, finds himself seized into a tragic cycle of inflicting more harm and dehumanization, now to his own children. Ultimately, this tears apart the slaveholder’s family, as the very fabric that holds their bond and trust together is torn by the infection that is slavery. Aside from the underlying harm inflicted on the wrong-doer, there is the horrible, albeit obvious, damage inflicted upon the receiver. In the case of slavery, slaves suffer great consequences from the harm dealt by slaveholders. The impact of this damage exceeds the simple physical and emotional trauma, eroding dignity, identity, psyche, and leaving an everlasting hole in the core of the victim. This is one of Douglass' largest points, completing his depiction of slavery as an invasive and unnatural force injurious for everyone involved.",
    "Page 19: “But, alas! this kind heart had but a short time to remain such. The fatal poison of irresponsible power was already in her hands, and soon commenced its infernal work. That cheerful eye, under the influence of slavery, soon became red with rage; that voice, made all of sweet accord, changed to one of harsh and horrid discord; and that angelic face gave place to that of a demon.”\nIn this quote, Douglass is explaining Hugh Auld’s wife’s descent into corruption after being exposed to the evil of slavery. Prior to this, he mentions her initial kindness, treating Douglass in a way he had never been treated. She began with open arms, but after longer exposure to slavery, the corruption spread to a point where she became as evil as every other slaveholder. This is a clear example of the consequences of harming others, as Mrs. Auld, inflicting harm onto Douglass and subjecting him to slavery, suffers from the corruption produced by her actions.",
    "Page 37: “In this state of mind, he [Mr. Covey] prayed with more than ordinary spirit. Poor man! such was his disposition, and success at deceiving, I do verily believe that he sometimes deceived himself into the solemn belief, that he was a sincere worshipper of the most high God; and this, too, at a time when he may be said to have been guilty of compelling his woman slave to commit the sin of adultery.”\nIn this passage, Douglass expresses Mr. Covey’s corruption from slavery. He supposedly was a sincere Christian, pure in spirit, yet subjected a slave to adultery. Douglass attempts to convey the idea that any man, regardless of purity, can succumb to the corruption of slavery. The wrong Mr. Covery does to his slaves flips back onto him, consequentially corrupting him despite his profound religious beliefs."
  ]

  var lineOpacity = delta < 2 ? Math.min(0.75, delta-1) : 0.75-((delta/2)-1)
  var instructionOpacity = delta < 2 ? Math.min(1, delta-1) : 1-((delta/2)-1)

  return (
    <>
      <Text
        position={[0.5, 1.75, -1.65]}
        rotation={[0, 245 * Math.PI/180, 0]}
        scale={0.1}
        font='Poppins-Medium.ttf'
        color={"black"}
        textAlign='center'
        lineHeight={1.25}
        fillOpacity={mode === -1 ? (1-delta*4) : Math.min(1, delta-1)}
        outlineOpacity={mode === -1 ? (1-delta*4) : Math.min(1, delta-1)}
        outlineColor={"white"}
        outlineWidth={0.05}
        anchorX={"center"}
        anchorY={"middle"}
      >
        {titles[selected.current]}
      </Text>
      <Text
        position={[2, 1.95, -2.8]}
        rotation={[0, 245 * Math.PI/180, 0]}
        scale={selected.current === 0 ? 0.056 : 0.07}
        font='Poppins-Medium.ttf'
        color={"black"}
        textAlign='left'
        maxWidth={selected.current === 0 ? 50 : 41}
        lineHeight={1.25}
        fillOpacity={mode === -1 ? (1-delta*4) : Math.min(1, delta-1.25)}
        outlineOpacity={mode === -1 ? (1-delta*4) : Math.min(1, delta-1.25)}
        outlineColor={"white"}
        outlineWidth={0.05}
        anchorX={"left"}
        anchorY={"top"}
      >
        {texts[selected.current]}
      </Text>
      <Text
        position={[0.037, 1.035, -0.511]}
        scale={[0.02, 0.0198, 0.0198]}
        rotation={[0, Math.PI, 0]}
        outlineWidth={0.015}
        outlineColor={selected.current === 0 ? 0x55c8ff : hovered.current === 0 ? 0x1195ff : 0xffffff}
        color={selected.current === 0 ? 0x55c8ff : hovered.current === 0 ? 0x1195ff : 0xffffff}
        font="TNR-Medium.ttf"
        args={[0.01, 0.1, 10, 20]}
        onPointerOver={() => hovered.current = 0 } 
        onPointerOut={() => hovered.current = -1 }
        onClick={() => selected.current = 0 }
      >
        I  AM  AN  AMERICAN
      </Text>
      <Text
        position={[0.054, 1.008, -0.511]}
        scale={[0.02, 0.0198, 0.0198]}
        rotation={[0, Math.PI, 0]}
        outlineWidth={0.015}
        outlineColor={selected.current === 1 ? 0x55c8ff : hovered.current === 1 ? 0x1195ff : 0xffffff}
        color={selected.current === 1 ? 0x55c8ff : hovered.current === 1 ? 0x1195ff : 0xffffff}
        font="TNR-Medium.ttf"
        args={[0.01, 0.1, 10, 20]}
        onPointerOver={() => hovered.current = 1 } 
        onPointerOut={() => hovered.current = -1 }
        onClick={() => selected.current = 1 }
      >
        AND  AS  AN  AMERICAN
      </Text>
      <Text
        position={[0.061, 0.982, -0.511]}
        scale={[0.02, 0.0198, 0.0198]}
        rotation={[0, Math.PI, 0]}
        outlineWidth={0.015}
        outlineColor={selected.current === 2 ? 0x55c8ff : hovered.current === 2 ? 0x1195ff : 0xffffff}
        color={selected.current === 2 ? 0x55c8ff : hovered.current === 2 ? 0x1195ff : 0xffffff}
        font="TNR-Medium.ttf"
        args={[0.01, 0.1, 10, 20]}
        onPointerOver={() => hovered.current = 2 } 
        onPointerOut={() => hovered.current = -1 }
        onClick={() => selected.current = 2 }
      >
        I  SPEAK  TO  AMERICA.
      </Text>
      <Line
        points={[[-0.085, 1.035, -0.511], [-0.2, 1.035, -0.6]]}
        color={"white"}
        lineWidth={4}
        opacity={lineOpacity}
        transparent={true}
      />
      <Line
        points={[[-0.085, 1.008, -0.511], [-0.2, 1.035, -0.6]]}
        color={"white"}
        lineWidth={4}
        opacity={lineOpacity}
        transparent={true}
      />
      <Line
        points={[[-0.075, 0.982, -0.511], [-0.2, 1.035, -0.6]]}
        color={"white"}
        lineWidth={4}
        opacity={lineOpacity}
        transparent={true}
      />
      <Text
        position={[-0.235, 1.035, -0.6]}
        rotation={[0, Math.PI, 0]}
        scale={0.02}
        font='Poppins-Medium.ttf'
        color={"white"}
        textAlign='center'
        lineHeight={1.25}
        fillOpacity={instructionOpacity}
        anchorX={"center"}
        anchorY={"middle"}
      >
        Click{"\n"}Here
      </Text>
    </>
  )
}

const cameraLocations = [
  {
    pos: [0, 2, 5],
    rotation: [0, 0, 0],
    exit_rotation: (i) => {
      return [0, i === cameraLocations.length-1 ? 360 : 0, 0]
    },
    content: (mode, delta, lastMod) => { // mode: -1 is exiting, 0 is done, 1 is entering
      delta = delta*3
      return (
        <>
          <Text
            position={[0, 2.5, 1]}
            scale={0.5}
            font='Poppins-Medium.ttf'
            color={"black"}
            textAlign='center'
            lineHeight={1.25}
            fillOpacity={mode === -1 ? (1-delta) : Math.min(1, delta-2)}
            outlineOpacity={mode === -1 ? (1-delta) : Math.min(1, delta-2)}
            outlineColor={"white"}
            outlineWidth={0.02}
            anchorX={"center"}
            anchorY={"middle"}
          >
            Beyond{"\n"}the{"\n"}Statue
          </Text>
          <Text
            position={[0, 1.5, 1]}
            scale={0.1}
            font='Poppins-Medium.ttf'
            color={"black"}
            textAlign='center'
            lineHeight={1.25}
            outlineColor={"white"}
            outlineWidth={0.05}
            fillOpacity={mode === -1 ? (1-delta) : Math.min(1, delta-2)}
            outlineOpacity={mode === -1 ? (1-delta) : Math.min(1, delta-2)}
            anchorX={"center"}
            anchorY={"middle"}
          >
            An exploration of themes in Frederick Douglass's novel
          </Text>
        </>
      )
    }
  },
  {
    pos: [-0.25, 3.5, 2.5],
    rotation: [0, -45, 0],
    content: (mode, delta, lastMod) => {
      return <DehumanizationSlide delta={delta} mode={mode}/>
    }
  },
  {
    pos: [1.9, 3.75, 0.5],
    rotation: [10, 120, 0],
    content: (mode, delta, lastMod) => {
      return <PowerOfEducationSlide delta={delta} mode={mode}/>
    }
  },
  {
    pos: [-0.94, 1.2, -2],
    rotation: [0, 245, 0],
    exit_rotation: (i) => {
      return [0, i === 0 ? -115 : 245, 0]
    },
    content: (mode, delta, lastMod) => {
      return <ConsequencesSlide delta={delta} mode={mode}/>
    }
  }
]

// function Loader() {
//   const { progress } = useProgress()
//   console.log("LOADING:", progress)
//   return <Html center>{progress} % loaded</Html>
// }

const DouglassModel = () => {
  const texture = useLoader(THREE.TextureLoader, "douglass.jpg")
  const obj = useLoader(OBJLoader, "douglass.obj")

  obj.traverse((child) => {
    if (child instanceof Mesh) {
      child.material.map = texture
    }
  })

  obj.rotation.set(Math.PI*1.5, 0, Math.PI)
  obj.position.set(0, 0, 0)

  return <primitive object={obj} scale={1} />
}

function lerp(start, end, delta) {
  return start + delta*(end-start)
}

function getCameraState(index, lastOp, lastMod, isAnimating) {
  var delta = (performance.now()-lastMod)/1500
  if (delta > 1) {
    isAnimating.current = false
    var entry = cameraLocations[index]
    return { pos: entry.pos, rotation: entry.rotation, content: entry.content(0, delta, lastMod) }
  }
  var cosDelta = (1-Math.cos(delta*Math.PI))/2

  var prev = index+lastOp < 0 ? cameraLocations.length-1 : index+lastOp >= cameraLocations.length ? 0 : index+lastOp

  var pEntry = cameraLocations[prev]
  var cEntry = cameraLocations[index]

  var pPos = pEntry.exit_pos
  if (pPos == null) pPos = pEntry.pos
  else pPos = pPos(index)
  var cPos = cEntry.pos

  var pRot = pEntry.exit_rotation
  if (pRot == null) pRot = pEntry.rotation
  else pRot = pRot(index)
  var cRot = cEntry.rotation
  
  isAnimating.current = true

  var pos = [lerp(pPos[0], cPos[0], cosDelta), lerp(pPos[1], cPos[1], cosDelta), lerp(pPos[2], cPos[2], cosDelta)]
  var rotation = [lerp(pRot[0], cRot[0], cosDelta), lerp(pRot[1], cRot[1], cosDelta), lerp(pRot[2], cRot[2], cosDelta)]

  return { pos: pos, rotation: rotation, content: (<>
    {cEntry.content(1, delta, lastMod)}
    {pEntry.content(-1, delta, lastMod)}
  </>) }
}

const DynamicScene = ({ fov }) => {
  const index = useRef(0)
  const lastOp = useRef(1)
  const isAnimating = useRef(false)
  const lastModification = useRef(0)
  const cameraRef = useRef()
  const [content, setContent] = useState()

  useEffect(() => {
    const onScroll = (event) => {
      if (!isAnimating.current) {
        lastModification.current = performance.now()

        if (event.deltaY > 0) {
          index.current += 1
          lastOp.current = -1
        } else {
          index.current -= 1
          lastOp.current = 1
        }

        if (index.current < 0)
          index.current = cameraLocations.length-1
        else if (index.current >= cameraLocations.length)
          index.current = 0
      }
    }

    window.addEventListener('wheel', onScroll)
    return () => window.removeEventListener('wheel', onScroll)
  })

  useFrame(() => {
    if (cameraRef) {
      var entry = getCameraState(index.current, lastOp.current, lastModification.current, isAnimating)

      var pos = entry.pos
      var rotation = entry.rotation

      cameraRef.current.position.set(pos[0], pos[1], pos[2])
      cameraRef.current.rotation.set(rotation[0] * Math.PI/180, rotation[1] * Math.PI/180, rotation[2] * Math.PI/180)
      setContent(entry.content)
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} fov={fov}/>
      {/* <OrbitControls/> */}
      {content}
    </>
  )
}

const SpotLight = ({ position, distance, intensity, angle, target, ...props }) => {
  const lightRef = useRef()
  useHelper(false, THREE.SpotLightHelper, 'red')
  const spotlight = useMemo(() => new THREE.SpotLight('#fff'), [])

  return (
    <group>
      <primitive object={spotlight} ref={lightRef} position={position} distance={distance} intensity={intensity} angle={angle} {...props}/>
      <primitive object={spotlight.target} position={target} />
    </group>
  )
}

function App() {
  const [fov, setFov] = useState(50)

  return (
    <div id="canvas-container" className="canvas-container">
      <div className="instruction-text">
        <button className="button" onClick={() => {
          window.dispatchEvent(new WheelEvent('wheel', {
            deltaY: 100
          }))
        }}>Next</button>
        <button className="button" style={{"margin-left": "65px"}} onClick={() => {
          window.dispatchEvent(new WheelEvent('wheel', {
            deltaY: -100
          }))
        }}>Prev</button>
        <button className="button" style={{"margin-top": "-125px"}} onClick={() => {
          setFov(fov-5)
        }}>Zoom+</button>
        <button className="button" style={{"margin-top": "-125px", "margin-left": "75px"}} onClick={() => {
          setFov(fov+5)
        }}>Zoom-</button>
        Scroll to explore 
        <br/>
        White elements are interactable
      </div>
      <div className="credit-text">
        Made by James Skilton
      </div>
      <Canvas>
        <Suspense fallback={null}>
          <DynamicScene fov={fov}/>
          <ambientLight intensity={0.3} />
          <SpotLight position={[-0.5, 4.5, 2]} distance={2.25} intensity={10} angle={Math.PI/5} target={[0.25, 3.7, 0]} decay={5} power={100}/>
          <SpotLight position={[2, 0.5, -3]} distance={3.75} intensity={20} angle={Math.PI/12} target={[-0.3, 1.2, 0]} decay={3}/>
          <DouglassModel/>
          <Stars
            radius={100}
            depth={100}
            count={4000}
            factor={4}
            saturation={0}
            fade
            speed={0.4}
          />
          <Sparkles
            count={500}
            size={10}
            speed={0.3}
            opacity={0.1}
            scale={10}
            color="#fff3b0"
          />
        </Suspense>
      </Canvas>
      <Loader
        initialState={() => true}
      />
    </div>
  );
}

export default App;
