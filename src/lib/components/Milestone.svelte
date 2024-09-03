<script lang="ts">
    import {P, Breadcrumb, BreadcrumbItem, AccordionItem, Accordion, Button, Checkbox} from 'flowbite-svelte';
    import {QuestionCircleSolid, ArrowRightOutline, HomeOutline} from 'flowbite-svelte-icons'
    import MilestoneButton from "$lib/components/MilestoneButton.svelte";

    export let data;

    let currentMilestoneIndex: number = 0;
    let selectedAnswer: number | null = data.milestones[currentMilestoneIndex].answer;
    let autoGoToNextMilestone: boolean = false;

    // build list of possible image urls at build time to be able to dynamically use them at run time:
    const images: Record<string, string> = import.meta.glob('$lib/assets/*.jpg', {
        eager: true,
        query: '?url',
        import: 'default'
    });

    function firstMilestone() {
        console.log("firstMilestone: clearing selected answer, setting current index to 0");
        selectedAnswer = null;
        currentMilestoneIndex = 0;
    }

    function nextMilestone() {
        if (selectedAnswer === null) {
            console.log("nextMilestone: No answer selected, ignoring");
        }
        console.log(`nextMilestone: Submitting answer ${selectedAnswer} for milestone ${currentMilestoneIndex}`);
        data.milestones[currentMilestoneIndex].answer = selectedAnswer;
        // todo: API call to submit answer?
        if (currentMilestoneIndex + 1 == data.milestones.length) {
            console.log(`nextMilestone: Last milestone complete`)
            // todo: redirect to bereichuebersicht?
            return;
        }
        currentMilestoneIndex += 1;
        console.log(`nextMilestone: currentMilestoneIndex = ${currentMilestoneIndex}`);
        selectedAnswer = data.milestones[currentMilestoneIndex].answer;
    }

    function selectAnswer(answer: number | null) {
        console.log(`selectAnswer: answer ${answer} selected for milestone ${currentMilestoneIndex}`);
        selectedAnswer = answer;
        if (selectedAnswer !== null && autoGoToNextMilestone) {
            console.log(`selectAnswer: calling nextMilestone`);
            nextMilestone();
        }
    }

</script>

<div class="flex flex-col bg-white border border-1 border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800 md:max-w-5xl">
    <div class="bg-gray-100 dark:bg-gray-600">
        <Breadcrumb olClass="inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-3 rtl:space-x-reverse flex-wrap" navClass="m-2">
            <BreadcrumbItem href="#" home>Start</BreadcrumbItem>
            <BreadcrumbItem href="#">MEIKE</BreadcrumbItem>
            <BreadcrumbItem href="#">Bereichübersicht</BreadcrumbItem>
            <!-- reload below is a temporary hack for demo purposes -->
            <BreadcrumbItem href="javascript:window.location.reload(true)">{data.title}</BreadcrumbItem>
            <BreadcrumbItem>{currentMilestoneIndex + 1} / {data.milestones.length}</BreadcrumbItem>
        </Breadcrumb>
    </div>
    <div>
        <div class="w-full flex flex-col md:flex-row">
            <img class="object-cover h-48 md:h-96 md:rounded-bl-lg w-full md:w-64 lg:w-96"
                 src={images[`/src/lib/assets/${data.milestones[currentMilestoneIndex].img}`]} alt="">
            <div class="m-2 md:m-4">
                <h2 class="mb-2 text-2xl font-bold text-gray-700 dark:text-gray-400">{data.milestones[currentMilestoneIndex].title}</h2>
                <P>{data.milestones[currentMilestoneIndex].desc}</P>
                <Accordion flush>
                    <AccordionItem>
                        <span slot="header" class="text-base flex gap-2">
                            <QuestionCircleSolid class="mt-0.5"/>
                            <span>Förderhilfen</span>
                        </span>
                        <P>
                            {data.milestones[currentMilestoneIndex].help}
                        </P>
                    </AccordionItem>
                </Accordion>
            </div>
            <div class="flex flex-col justify-items-stretch rounded-lg m-1">
                <MilestoneButton color="green-50" selected={selectedAnswer===0} onClick={() => {selectAnswer(0)}}
                                 tooltip="Das Kind macht noch keine Anstalten bzw. ist noch nicht in der Lage, das Verhalten auszuführen.">
                    Noch gar nicht
                </MilestoneButton>
                <MilestoneButton color="green-100" selected={selectedAnswer===1} onClick={() => {selectAnswer(1)}}
                                 tooltip="Das Kind zeigt erste Ansätze, das Verhalten auszuführen, weicht dabei aber noch erheblich von der Beschreibung ab oder/und ist sehr unsicher.">
                    In Ansätzen
                </MilestoneButton>
                <MilestoneButton color="green-200" selected={selectedAnswer===2} onClick={() => {selectAnswer(2)}}
                                 tooltip="Das Kind beherrscht das Verhalten im Prinzip, zeigt es aber erst selten, ist dabei  noch leicht unsicher oder führt es nicht ganz sauber aus.">
                    Weitgehend
                </MilestoneButton>
                <MilestoneButton color="green-400" selected={selectedAnswer===3} onClick={() => {selectAnswer(3)}}
                                 tooltip="Das Kind zeigt das Verhalten mehrmals sicher und genau wie beschrieben.">
                    Zuverlässig
                </MilestoneButton>
                <Button color="light" disabled={selectedAnswer === null} on:click={nextMilestone} class="m-1 mt-4">
                    Weiter
                    <ArrowRightOutline class="w-5 h-5 ms-2"/>
                </Button>
                <Checkbox class="m-1" bind:checked={autoGoToNextMilestone}>
                    <P class="text-xs">Automatisch weiter</P>
                </Checkbox>
            </div>
        </div>
    </div>
</div>