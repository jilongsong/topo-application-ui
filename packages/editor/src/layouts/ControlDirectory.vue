<template>
  <div class="h-full flex items-center">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button class="shadow-lg" size="sm" variant="ghost">
          <img class="w-8 h-8" src="" alt="" srcset="" />
          <ChevronDownIcon class="w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HomeIcon class="mr-2 h-4 w-4" />
            <span>回到首页</span>
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FolderOpenIcon class="mr-2 h-4 w-4" />
              <span>文件</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <MailIcon class="mr-2 h-4 w-4" />
                  <span>新建页面</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquareIcon class="mr-2 h-4 w-4" />
                  <span>导入页面</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PlusCircleIcon class="mr-2 h-4 w-4" />
                  <span>删除页面</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <CreditCardIcon class="mr-2 h-4 w-4" />
            <span>工具</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon class="mr-2 h-4 w-4" />
            <span>操作手册2</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon class="mr-2 h-4 w-4" />
            <span>设置</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PlusSquareIcon class="mr-2 h-4 w-4" />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <GithubIcon class="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <CloudIcon class="mr-2 h-4 w-4" />
          <span>联系我们</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon class="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import {
  ChevronDownIcon,
  CloudIcon,
  CreditCardIcon,
  FolderOpenIcon,
  GithubIcon,
  HomeIcon,
  LogOutIcon,
  MailIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  PlusSquareIcon,
  SettingsIcon,
  UserIcon,
} from '@topo/icon';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@topo/ui';
</script>
