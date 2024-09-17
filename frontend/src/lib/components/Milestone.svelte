<script lang="ts">
    import {P, Breadcrumb, BreadcrumbItem, AccordionItem, Accordion, Button, Checkbox} from 'flowbite-svelte';
    import {QuestionCircleSolid, InfoCircleSolid, ArrowRightOutline, ArrowLeftOutline} from 'flowbite-svelte-icons'
    import MilestoneButton from "$lib/components/MilestoneButton.svelte";
    import { _ } from 'svelte-i18n';

    export let data;

    let currentMilestoneIndex: number = 0;
    let selectedAnswer: number | null = data.milestones[currentMilestoneIndex].answer;
    let autoGoToNextMilestone: boolean = false;

    // build list of possible image urls at build time to be able to dynamically use them at run time:
    const img_urls: Record<string, string> = import.meta.glob('$lib/assets/*.jpg', {
        eager: true,
        query: '?url',
        import: 'default'
    });

    let currentImageIndex:number = 0;
    const imageInterval = 5000;
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % data.milestones[currentMilestoneIndex].imgs.length;
    }, imageInterval);

    function prevMilestone() {
        if (currentMilestoneIndex === 0) {
            console.log("prevMilestone: Already at first milestone, ignoring");
        }
        currentMilestoneIndex -= 1;
        console.log(`prevMilestone: currentMilestoneIndex = ${currentMilestoneIndex}`);
        selectedAnswer = data.milestones[currentMilestoneIndex].answer;
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
            // todo: redirect to bereichuebersicht? or go to next set of milestones?
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

<div class="flex flex-col bg-white border border-1 border-gray-200 md:rounded-lg shadow dark:border-gray-700 dark:bg-gray-800 md:max-w-7xl">
    <div class="bg-gray-100 dark:bg-gray-600 md:rounded-t-lg">
        <Breadcrumb olClass="inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-3 rtl:space-x-reverse flex-wrap" navClass="m-2">
            <BreadcrumbItem href="#" home>Start</BreadcrumbItem>
            <BreadcrumbItem href="#">MEIKE</BreadcrumbItem>
            <BreadcrumbItem href="#">{$_("milestone.milestones")}</BreadcrumbItem>
            <!-- reload below is a temporary hack for demo purposes -->
            <BreadcrumbItem href="javascript:window.location.reload(true)">{data.title}</BreadcrumbItem>
            <BreadcrumbItem>{currentMilestoneIndex + 1} / {data.milestones.length}</BreadcrumbItem>
        </Breadcrumb>
    </div>
    <div>
        <div class="w-full flex flex-col md:flex-row">
            <div>
            {#each data.milestones[currentMilestoneIndex].imgs as img, imgIndex}
                <img class={`absolute object-cover h-48 md:h-96 md:rounded-bl-lg w-full md:w-48 lg:w-72 xl:w-96 transition duration-1000 ease-in-out ${imgIndex===currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                     src={img_urls[`/src/lib/assets/${img}`]} alt="">
            {/each}
                <div class="h-48 md:h-96 md:rounded-bl-lg w-full md:w-48 lg:w-72 xl:w-96"></div>
            </div>
            <div class="m-2 md:m-4">
                <h2 class="mb-2 text-2xl font-bold text-gray-700 dark:text-gray-400">{data.milestones[currentMilestoneIndex].title}</h2>
                <P>{data.milestones[currentMilestoneIndex].desc}</P>
                <Accordion flush>
                    <AccordionItem>
                        <span slot="header" class="text-base flex gap-2">
                            <InfoCircleSolid class="mt-0.5"/>
                            <span>{$_("milestone.observation")}</span>
                        </span>
                        <P>
                            {data.milestones[currentMilestoneIndex].observation}
                        </P>
                    </AccordionItem>
                    <AccordionItem>
                        <span slot="header" class="text-base flex gap-2">
                            <QuestionCircleSolid class="mt-0.5"/>
                            <span>{$_("milestone.help")}</span>
                        </span>
                        <P>
                            {data.milestones[currentMilestoneIndex].help}
                        </P>
                    </AccordionItem>
                </Accordion>
            </div>
            <div class="flex flex-col justify-items-stretch rounded-lg m-1">
                {#each [0,1,2,3] as answerIndex}
                <MilestoneButton index={answerIndex} selected={selectedAnswer===answerIndex} onClick={() => {selectAnswer(answerIndex)}}
                                 tooltip={$_(`milestone.answer${answerIndex}.description`)}>
                    {$_(`milestone.answer${answerIndex}.text`)}
                </MilestoneButton>
                {/each}
                <div class="flex flex-row justify-center">
                    <Button color="light" disabled={currentMilestoneIndex === 0} on:click={prevMilestone} class="m-1 mt-4">
                        <ArrowLeftOutline class="w-5 h-5 me-2"/>
                        {$_('milestone.prev')}
                    </Button>
                    <Button color="light" disabled={selectedAnswer === null} on:click={nextMilestone} class="m-1 mt-4">
                        {$_('milestone.next')}
                        <ArrowRightOutline class="w-5 h-5 ms-2"/>
                    </Button>
                </div>
                <Checkbox class="m-1 justify-center" bind:checked={autoGoToNextMilestone}>
                    <P class="text-xs">{$_("milestone.autonext")}</P>
                </Checkbox>
            </div>
        </div>
    </div>
</div>
