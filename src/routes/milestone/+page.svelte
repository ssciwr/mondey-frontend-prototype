<script>
    // Demo page for Milestone component
    import Milestone from '$lib/components/Milestone.svelte';

    const data = {
        "title": "Grobmotorik",
        "desc": " Hier geht es darum, zu beschreiben, wie sich das Kind fortbewegt Und seinen Körper (Rumpf, Arme, Beine) kontrollieren kann.",
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
                "help": "Help text goes here",
                "img": "baby1.jpg",
                "answer": null
            },
            {
                "number": 3,
                "title": "Den Kopf frei bewegen",
                "desc": "Kind kann seinen Kopf frei halten und bewegen, wenn es z.B. auf dem Schoß sitzt. Wenn man seinen Körper ein wenig schräg hält, gleicht es diese Bewegung mit dem Kopf aus. Der Kopf wackelt kaum oder gar nicht, wenn das Kind ihn dreht.",
                "help": "Help text goes here",
                "img": "baby2.jpg",
                "answer": null
            },
            {
                "number": 4,
                "title": "Sich in Bauchlage mit gestreckten Armen aufstützen",
                "desc": "Kind liegt auf dem Bauch. Es stützt sich mit beiden Armen gestreckt von der Unterlage ab und hebt seinen Rücken an, um den Kopf aufrecht zu halten. Schultern und Brust liegen für mehr als 3 Sekunden nicht mehr auf der Unterlage.",
                "help": "Help text goes here",
                "img": "baby3.jpg",
                "answer": null
            }
        ]
    }
</script>

<div class="flex justify-center items-center">
    <Milestone data={data}/>
</div>