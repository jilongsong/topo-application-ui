import { onMounted, onUnmounted, provide, ref } from 'vue';

import { App, Cmd, EditorAbility, EditorEventArgs, EditorService, RendererService } from '@topo/engine';
import { MElement } from '@topo/schema';

import { CommandKey, ContextKey, ServicesKey } from '../constants/inject-keys';
import { EditorLayout } from '../type';

export const useEngine = (ability?: EditorAbility) => {
  const app = new App();
  const editorService = new EditorService({ context: app, ability });

  const selected = ref<MElement[]>([]);
  const selectedElement = ref<MElement>();
  const layout = ref<EditorLayout>(
    EditorLayout.Sidebar | EditorLayout.Workspace | EditorLayout.Properties | EditorLayout.TopBar
  );

  RendererService.createGraph(app, {
    background: {
      color: '#fff',
    },
  });

  const onSelectionChanged = (e: EditorEventArgs['selection:changed']) => {
    selected.value = e.selected.map((el) => el.toJSON());
    selectedElement.value = e.selected?.[0];
  };

  onMounted(() => {
    editorService.on('selection:changed', onSelectionChanged);
  });

  onUnmounted(() => {
    editorService.off('selection:changed', onSelectionChanged);
  });

  provide(ContextKey, {
    app,
    layout,
    selected,
    selectedElement,
  });

  provide(ServicesKey, {
    editorService,
  });

  provide(CommandKey, {
    updateVertex: (payload: Cmd.UpdateVertex) => app.execute<Cmd.UpdateVertex>('UpdateVertexCmd', payload),
    updateLink: (payload: Cmd.UpdateLink) => app.execute<Cmd.UpdateLink>('UpdateLinkCmd', payload),
    addElement: (payload: Cmd.AddElement) => app.execute<Cmd.AddElement>('AddElementCmd', payload),
    deleteElement: (payload: Cmd.DelElement) => app.execute<Cmd.DelElement>('DelElementCmd', payload),
    updateCanvas: (payload: Cmd.UpdateCanvas) => app.execute<Cmd.UpdateCanvas>('UpdateCanvasCmd', payload),
  });
};

export default useEngine;
