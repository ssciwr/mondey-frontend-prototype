<script>
    // Demo page for Milestone component - in the future all this data will come from an API call to the backend
    import Milestone from '$lib/components/Milestone.svelte';
    import { locale } from 'svelte-i18n';

    const data = {
        "de": {
        "title": "Grobmotorik",
        "desc": "Hier geht es darum, zu beschreiben, wie sich das Kind fortbewegt Und seinen Körper (Rumpf, Arme, Beine) kontrollieren kann.",
        "milestones": [
            {
                "number": 1,
                "title": "Alleine von Stufe/Absatz springen",
                "desc": "Kind springt mit beiden Beinen gleichzeitig hoch und überwindet im Sprung freihändig einen (kleinen) Absatz oder eine Stufe. Es kommt sicher wieder im Stand auf.",
                "help": "Beim Treppengehen im Haus, beim Spazierengehen oder auf dem Spielplatz bieten sich vielfältige Gelegenheiten, Kinder zum Springen von einem Absatz (z.B. einem höheren Bordstein. einem Holzstamm, oder einem Stein) zu ermutigen. Machen Sie Ihrem Kind die Bewegung vor oder führen Sie sie gemeinsam mit dem Kind durch. Nehmen Sie das Kind dafür zunächst bei an die Hand. Später können sie die Hand immer lockerer mitführen und die Eigenbewegung des Kindes nur noch passiv begleiten. So kann das Kind am besten selbst herausfinden, wie es seine Arme einsetzen muss, um Schwung zu holen und beim Landen das Gleichgewicht zu finden. Ist das Springen an der Hand sicher, lösen Sie die Hand ganz und stellen Sie sich gegenüber dem Kind hin, damit es weiß, dass es im Notfall aufgefangen wird.",
                "img": "baby0.jpg",
                "answer": null
            },
            {
                "number": 2,
                "title": "Das Köpfchen alleine heben",
                "desc": "Kind liegt auf dem Bauch, hält die Arme angewinkelt neben dem Körper und hebt sein Köpfchen aus eigener Kraft so hoch, dass das Kinn nicht mehr die Auflage berührt. Diese Position kann es mehr als 3 Sekunden halten.",
                "help": "Hier kommt der Hilfetext hin",
                "img": "baby1.jpg",
                "answer": null
            },
            {
                "number": 3,
                "title": "Den Kopf frei bewegen",
                "desc": "Kind kann seinen Kopf frei halten und bewegen, wenn es z.B. auf dem Schoß sitzt. Wenn man seinen Körper ein wenig schräg hält, gleicht es diese Bewegung mit dem Kopf aus. Der Kopf wackelt kaum oder gar nicht, wenn das Kind ihn dreht.",
                "help": "Hier kommt der Hilfetext hin",
                "img": "baby2.jpg",
                "answer": null
            },
            {
                "number": 4,
                "title": "Sich in Bauchlage mit gestreckten Armen aufstützen",
                "desc": "Kind liegt auf dem Bauch. Es stützt sich mit beiden Armen gestreckt von der Unterlage ab und hebt seinen Rücken an, um den Kopf aufrecht zu halten. Schultern und Brust liegen für mehr als 3 Sekunden nicht mehr auf der Unterlage.",
                "help": "Hier kommt der Hilfetext hin",
                "img": "baby3.jpg",
                "answer": null
            }
        ]
    },
        "en": {
            "title": "Motorskills",
            "desc": "The aim here is to describe the movement and body control (torso, arms, legs) of the child.",
            "milestones": [
                {
                    "number": 1,
                    "title": "Jump from a step unaided",
                    "desc": "The child jumps up with both legs at the same time, overcomes a (small) ledge or step without using their hands, and lands back on their feet.",
                    "help": "When climbing stairs in the house, when taking a walk, or on the playground, there are many opportunities to encourage children to jump from a step (e.g. a higher curb, a log, or a stone). Show your child the movement or do it together with them. To begin with, hold the child by the hand. Later, you can move your hand more loosely and only passively accompany the child's movement. This is the best way for the child to find out for themselves how to use their arms to gain momentum and find balance when landing. Once it is safe to jump holding your hand, release your hand completely and stand opposite the child so that they know that they will be caught in an emergency.",
                    "img": "baby0.jpg",
                    "answer": null
                },
                {
                    "number": 2,
                    "title": "Lift their head unaided",
                    "desc": "The child lies on their stomach, holds their arms bent beside their body and lifts their head up under their own power until their chin no longer touches the support. They can hold this position for more than 3 seconds.",
                    "help": "Help text goes here",
                    "img": "baby1.jpg",
                    "answer": null
                },
                {
                    "number": 3,
                    "title": "Move their head freely",
                    "desc": "The child can hold and move their head freely, for example when they are sitting on your lap. If you hold their body at a slight angle, they will compensate for this movement with their head. The head hardly wobbles or does not wobble at all when the child turns it.",
                    "help": "Help text goes here",
                    "img": "baby2.jpg",
                    "answer": null
                },
                {
                    "number": 4,
                    "title": "Lift head while lying face down",
                    "desc": "Child lies on their stomach. They support themselves with both arms stretched out from the surface and lift their back to keep their head upright. Shoulders and chest are no longer on the surface for more than 3 seconds.",
                    "help": "Help text goes here",
                    "img": "baby3.jpg",
                    "answer": null
                }
            ]
        }
    }
</script>

<div class="flex justify-center items-center">
    <Milestone data={data[$locale]}/>
</div>